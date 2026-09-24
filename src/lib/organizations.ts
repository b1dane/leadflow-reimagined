import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const createOrgSchema = z.object({
  name: z.string().trim().min(2).max(120),
});

/**
 * Create a new organization (business) for the current user.
 * Also adds them as owner in org_members if that table exists.
 */
export const createOrganization = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createOrgSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: org, error } = await context.supabase
      .from("organizations")
      .insert({ name: data.name })
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Best-effort: add to org_members if the table/columns exist
    try {
      await context.supabase.from("org_members").insert({
        org_id: org.id,
        user_id: context.userId,
        role: "owner",
      });
    } catch {
      // org_members may have different column names; ignore for now
    }

    return org;
  });

/**
 * List organizations the current user can access.
 */
export const listMyOrganizations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getOrganization = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: org, error } = await context.supabase
      .from("organizations")
      .select("*")
      .eq("id", data.id)
      .single();

    if (error) throw new Error(error.message);
    return org;
  });

export const updateOrganization = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        patch: z.object({
          name: z.string().trim().min(2).max(120).optional(),
        }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: org, error } = await context.supabase
      .from("organizations")
      .update(data.patch)
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return org;
  });
