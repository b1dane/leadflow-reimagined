import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Sparkles, Plus, LogOut, Copy, Loader2, Trash2, Mail, Phone, Check, ChevronDown,
} from "lucide-react";
import { listLeads, createLead, updateLead, deleteLead } from "@/lib/leads.functions";
import { useAuth } from "@/hooks/use-auth";
import { useOrg, OrgProvider } from "@/hooks/use-org";
import { Onboarding } from "@/components/Onboarding";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — VeloSys" }] }),
});

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

const STATUS_STYLES: Record<string, string> = {
  new: "bg-primary/15 text-primary border-primary/30",
  contacted: "bg-accent/15 text-accent border-accent/30",
  qualified: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  won: "bg-emerald-600/20 text-emerald-300 border-emerald-500/40",
  lost: "bg-muted text-muted-foreground border-border",
};

function DashboardPage() {
  return (
    <OrgProvider>
      <DashboardInner />
    </OrgProvider>
  );
}

function DashboardInner() {
  const { user } = useAuth();
  const { orgs, activeOrg, setActiveOrgId, loading: orgLoading, refetch } = useOrg();
  const queryClient = useQueryClient();

  const fetchLeads = useServerFn(listLeads);
  const create = useServerFn(createLead);
  const update = useServerFn(updateLead);
  const remove = useServerFn(deleteLead);

  const orgId = activeOrg?.id;

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads", orgId],
    queryFn: () => fetchLeads({ data: { org_id: orgId! } }),
    enabled: !!orgId,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["leads", orgId] });

  const createMut = useMutation({
    mutationFn: (d: Record<string, unknown>) =>
      create({ data: { ...d, org_id: orgId } as never }),
    onSuccess: invalidate,
  });
  const updateMut = useMutation({
    mutationFn: (v: { id: string; patch: Record<string, unknown> }) =>
      update({ data: { id: v.id, org_id: orgId!, patch: v.patch } as never }),
    onSuccess: invalidate,
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id, org_id: orgId! } }),
    onSuccess: invalidate,
  });

  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  if (orgLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (orgs.length === 0) {
    return <Onboarding onComplete={() => refetch()} />;
  }

  const captureUrl = orgId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/capture/${orgId}`
    : "";

  const stats = {
    total: leads.length,
    new: leads.filter((l: any) => l.status === "new").length,
    qualified: leads.filter((l: any) => l.status === "qualified").length,
    won: leads.filter((l: any) => l.status === "won").length,
  };

  return (
    <div className="min-h-screen bg-background bg-grain">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-card">
              <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="font-display text-xl tracking-tight">VeloSys</span>
          </Link>

          <div className="flex items-center gap-3">
            {orgs.length > 1 && (
              <div className="relative">
                <select
                  value={activeOrg?.id}
                  onChange={(e) => setActiveOrgId(e.target.value)}
                  className="appearance-none rounded-full border border-border bg-surface pl-3 pr-8 py-1.5 text-sm"
                >
                  {orgs.map((o) => (
                    <option key={o.id} value={o.id}>{o.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
            {orgs.length === 1 && (
              <span className="hidden sm:block text-sm text-muted-foreground truncate max-w-[160px]">
                {activeOrg?.name}
              </span>
            )}
            <span className="hidden md:block text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={async () => { await supabase.auth.signOut(); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-gradient">Your pipeline</h1>
            <p className="mt-1 text-muted-foreground">Every lead, looked after.</p>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Add lead
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "New", value: stats.new },
            { label: "Qualified", value: stats.qualified },
            { label: "Won", value: stats.won },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card/60 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="mt-1 font-display text-3xl">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-border/60 bg-card/40 p-4 flex flex-wrap items-center gap-3">
          <div className="text-sm min-w-0 flex-1">
            <div className="text-muted-foreground text-xs uppercase tracking-wider">Public capture link</div>
            <div className="font-mono text-xs sm:text-sm mt-0.5 break-all">{captureUrl}</div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(captureUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm shrink-0"
          >
            {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              await createMut.mutateAsync({
                name: fd.get("name") as string,
                email: (fd.get("email") as string) || "",
                phone: (fd.get("phone") as string) || "",
                service: (fd.get("service") as string) || "",
                notes: (fd.get("notes") as string) || "",
                status: "new",
              });
              setShowForm(false);
            }}
            className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <input required name="name" placeholder="Name *" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <input name="email" type="email" placeholder="Email" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <input name="phone" placeholder="Phone" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <input name="service" placeholder="Service" className="rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            <textarea name="notes" placeholder="Notes" className="md:col-span-2 rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]" />
            <div className="md:col-span-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-border px-4 py-2 text-sm">Cancel</button>
              <button type="submit" disabled={createMut.isPending} className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60">
                {createMut.isPending ? "Saving…" : "Save lead"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/30 py-16 text-center">
              <p className="font-display text-2xl text-gradient">No leads yet</p>
              <p className="mt-2 text-sm text-muted-foreground">Add your first lead or share your capture link.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {leads.map((lead: any) => (
                <li key={lead.id} className="rounded-xl border border-border/60 bg-card/60 p-4 flex flex-wrap items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-sm font-medium shrink-0">
                    {(lead.name || lead.full_name || "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{lead.name || lead.full_name}</div>
                    <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {lead.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>}
                      {lead.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</span>}
                      {lead.service && <span>· {lead.service}</span>}
                    </div>
                  </div>
                  <select
                    value={lead.status || "new"}
                    onChange={(e) => updateMut.mutate({ id: lead.id, patch: { status: e.target.value } })}
                    className={`rounded-full border px-3 py-1 text-xs shrink-0 ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-background text-foreground">{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => { if (confirm("Delete this lead?")) deleteMut.mutate(lead.id); }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
