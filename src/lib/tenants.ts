import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const createTenantSchema = z.object({
  name: z.string().trim().min(2).max(120),
  industry: z
    .enum(["general", "hvac", "fence", "roofing", "plumbing", "electrical", "solar", "landscaping", "other"])
    .default("general"),
  brand_voice: z.string().trim().max(300).optional(),
  timezone: z.string().trim().max(60).optional(),
});

/**
 * Create a new tenant (business) for the current user and
 * automatically add them as owner in tenant_members.
 * Also copies the matching industry starter sequence.
 */
export const createTenant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createTenantSchema.parse(input))
  .handler(async ({ data, context }) => {
    const slugBase = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);

    const slug = `${slugBase}-${crypto.randomUUID().slice(0, 6)}`;

    const { data: tenant, error } = await context.supabase
      .from("tenants")
      .insert({
        owner_user_id: context.userId,
        name: data.name,
        slug,
        industry: data.industry,
        brand_voice: data.brand_voice || "friendly, professional, direct",
        timezone: data.timezone || "America/Chicago",
        status: "trial",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Add owner to tenant_members
    await context.supabase.from("tenant_members").insert({
      tenant_id: tenant.id,
      user_id: context.userId,
      role: "owner",
    });

    // Copy the matching industry starter sequence (or general)
    const { data: templates } = await context.supabase
      .from("sequences")
      .select("*")
      .is("tenant_id", null)
      .eq("industry", data.industry)
      .limit(1);

    const template = templates?.[0];
    if (template) {
      await context.supabase.from("sequences").insert({
        tenant_id: tenant.id,
        name: template.name,
        industry: template.industry,
        is_active: true,
        steps: template.steps,
      });
    }

    return tenant;
  });

/**
 * Get all tenants the current user belongs to.
 */
export const listMyTenants = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("tenants")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  });

/**
 * Get a single tenant by id (must belong to the user).
 */
export const getTenant = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: tenant, error } = await context.supabase
      .from("tenants")
      .select("*")
      .eq("id", data.id)
      .single();

    if (error) throw new Error(error.message);
    return tenant;
  });

/**
 * Update tenant profile (name, industry, brand voice, etc.)
 */
export const updateTenant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        patch: z.object({
          name: z.string().trim().min(2).max(120).optional(),
          industry: z.string().optional(),
          brand_voice: z.string().trim().max(300).optional(),
          primary_color: z.string().optional(),
          timezone: z.string().optional(),
          logo_url: z.string().url().optional().or(z.literal("")),
        }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: tenant, error } = await context.supabase
      .from("tenants")
      .update(data.patch)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return tenant;
  });
