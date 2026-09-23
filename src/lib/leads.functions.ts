import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const leadInputSchema = z.object({
  tenant_id: z.string().uuid(),
  homeowner_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  address: z.string().trim().max(255).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  source: z.string().trim().max(60).default("manual"),
  score: z.number().int().min(0).max(100).default(0),
  status: z
    .enum(["new", "qualifying", "follow_up", "booked", "won", "lost", "opted_out"])
    .default("new"),
  estimated_value: z.number().optional(),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  custom_fields: z.record(z.any()).optional(),
});

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ tenant_id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("leads")
      .select("*")
      .eq("tenant_id", data.tenant_id)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const createLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase
      .from("leads")
      .insert({
        tenant_id: data.tenant_id,
        homeowner_name: data.homeowner_name,
        email: data.email || null,
        phone: data.phone || null,
        company: data.company || null,
        address: data.address || null,
        city: data.city || null,
        source: data.source,
        score: data.score,
        status: data.status,
        estimated_value: data.estimated_value ?? null,
        notes: data.notes || null,
        custom_fields: data.custom_fields ?? {},
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        tenant_id: z.string().uuid(),
        patch: leadInputSchema.partial().omit({ tenant_id: true }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase
      .from("leads")
      .update(data.patch)
      .eq("id", data.id)
      .eq("tenant_id", data.tenant_id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), tenant_id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("leads")
      .delete()
      .eq("id", data.id)
      .eq("tenant_id", data.tenant_id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── Public capture (no auth) ────────────────────────────────
const captureSchema = z.object({
  tenant_id: z.string().uuid(),
  homeowner_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(60).default("capture-form"),
});

export const captureLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => captureSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads").insert({
      tenant_id: data.tenant_id,
      homeowner_name: data.homeowner_name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      notes: data.notes || null,
      source: data.source,
      status: "new",
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Landing page intake (legacy support)
const intakeSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
});

export const submitIntake = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => intakeSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads").insert({
      tenant_id: "00000000-0000-0000-0000-000000000000",
      homeowner_name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      notes: data.service ? `Service interested in: ${data.service}` : null,
      source: "landing-intake",
      status: "new",
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });
