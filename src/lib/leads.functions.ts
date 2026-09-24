import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const leadInputSchema = z.object({
  org_id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  status: z.string().default("new"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  full_name: z.string().trim().max(120).optional().or(z.literal("")),
});

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ org_id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("leads")
      .select("*")
      .eq("org_id", data.org_id)
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
        org_id: data.org_id,
        name: data.name,
        full_name: data.full_name || data.name,
        email: data.email || null,
        phone: data.phone || null,
        service: data.service || null,
        status: data.status || "new",
        notes: data.notes || null,
        user_id: context.userId,
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
        org_id: z.string().uuid(),
        patch: leadInputSchema.partial().omit({ org_id: true }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase
      .from("leads")
      .update(data.patch)
      .eq("id", data.id)
      .eq("org_id", data.org_id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), org_id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("leads")
      .delete()
      .eq("id", data.id)
      .eq("org_id", data.org_id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

const captureSchema = z.object({
  org_id: z.string().uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const captureLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => captureSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("leads").insert({
      org_id: data.org_id,
      name: data.name,
      full_name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      service: data.service || null,
      notes: data.notes || null,
      status: "new",
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });

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
      name: data.name,
      full_name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      service: data.service || null,
      notes: data.service ? `Service interested in: ${data.service}` : null,
      status: "new",
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });
