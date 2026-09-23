import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Sparkles,
  Plus,
  LogOut,
  Copy,
  Loader2,
  Trash2,
  Mail,
  Building2,
  Phone,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  listLeads,
  createLead,
  updateLead,
  deleteLead,
} from "@/lib/leads.functions";
import { useAuth } from "@/hooks/use-auth";
import { useTenant, TenantProvider } from "@/hooks/use-tenant";
import { Onboarding } from "@/components/Onboarding";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "Dashboard — VeloSys" }] }),
});

const STATUSES = [
  "new",
  "qualifying",
  "follow_up",
  "booked",
  "won",
  "lost",
  "opted_out",
] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-primary/15 text-primary border-primary/30",
  qualifying: "bg-accent/15 text-accent border-accent/30",
  follow_up: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  booked: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  won: "bg-emerald-600/20 text-emerald-300 border-emerald-500/40",
  lost: "bg-muted text-muted-foreground border-border",
  opted_out: "bg-muted text-muted-foreground border-border",
};

function DashboardPage() {
  return (
    <TenantProvider>
      <DashboardInner />
    </TenantProvider>
  );
}

function DashboardInner() {
  const { user } = useAuth();
  const { tenants, activeTenant, setActiveTenantId, loading: tenantLoading, refetch } =
    useTenant();
  const queryClient = useQueryClient();

  const fetchLeads = useServerFn(listLeads);
  const create = useServerFn(createLead);
  const update = useServerFn(updateLead);
  const remove = useServerFn(deleteLead);

  const tenantId = activeTenant?.id;

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads", tenantId],
    queryFn: () => fetchLeads({ data: { tenant_id: tenantId! } }),
    enabled: !!tenantId,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["leads", tenantId] });

  const createMut = useMutation({
    mutationFn: (d: Record<string, unknown>) =>
      create({ data: { ...d, tenant_id: tenantId } as never }),
    onSuccess: invalidate,
  });
  const updateMut = useMutation({
    mutationFn: (v: { id: string; patch: Record<string, unknown> }) =>
      update({
        data: { id: v.id, tenant_id: tenantId!, patch: v.patch } as never,
      }),
    onSuccess: invalidate,
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) =>
      remove({ data: { id, tenant_id: tenantId! } }),
    onSuccess: invalidate,
  });

  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  if (tenantLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (tenants.length === 0) {
    return <Onboarding onComplete={() => refetch()} />;
  }

  const captureUrl = tenantId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/capture/${tenantId}`
    : "";

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    booked: leads.filter((l) => l.status === "booked").length,
    won: leads.filter((l) => l.status === "won").length,
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
            {tenants.length > 1 && (
              <div className="relative">
                <select
                  value={activeTenant?.id}
                  onChange={(e) => setActiveTenantId(e.target.value)}
                  className="appearance-none rounded-full border border-border bg-surface pl-3 pr-8 py-1.5 text-sm hover:bg-surface-elevated transition cursor-pointer"
                >
                  {tenants.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}

            {tenants.length === 1 && (
              <span className="hidden sm:block text-sm text-muted-foreground truncate max-w-[160px]">
                {activeTenant?.name}
              </span>
            )}

            <span className="hidden md:block text-sm text-muted-foreground">
              {user?.email}
            </span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:bg-surface-elevated transition"
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
            <p className="mt-1 text-muted-foreground">
              Every lead, looked after.
            </p>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add lead
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Total", value: stats.total },
            { label: "New", value: stats.new },
            { label: "Booked", value: stats.booked },
            { label: "Won", value: stats.won },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border/60 bg-card/60 p-4"
            >
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
              <div className="mt-1 font-display text-3xl">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-border/60 bg-card/40 p-4 flex flex-wrap items-center gap-3">
          <div className="text-sm min-w-0 flex-1">
            <div className="text-muted-foreground text-xs uppercase tracking-wider">
              Public capture link
            </div>
            <div className="font-mono text-xs sm:text-sm mt-0.5 text-foreground/90 break-all">
              {captureUrl}
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(captureUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm hover:bg-surface-elevated shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>

        {showForm && (
          <LeadForm
            onCancel={() => setShowForm(false)}
            onSubmit={async (values) => {
              await createMut.mutateAsync(values);
              setShowForm(false);
            }}
            busy={createMut.isPending}
          />
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/30 py-16 text-center">
              <p className="font-display text-2xl text-gradient">No leads yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your first lead or share your capture link.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {leads.map((lead) => (
                <li
                  key={lead.id}
                  className="rounded-xl border border-border/60 bg-card/60 p-4 flex flex-wrap items-center gap-4 hover:bg-card transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/30 text-sm font-medium shrink-0">
                    {(lead.homeowner_name || "?").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium truncate">
                        {lead.homeowner_name}
                      </span>
                      {lead.company && (
                        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {lead.company}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {lead.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </span>
                      )}
                      {lead.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                      )}
                      <span>· {lead.source}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display text-2xl text-accent">
                      {lead.score}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      score
                    </div>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      updateMut.mutate({
                        id: lead.id,
                        patch: { status: e.target.value },
                      })
                    }
                    className={`rounded-full border px-3 py-1 text-xs shrink-0 ${
                      STATUS_STYLES[lead.status as Status] ?? STATUS_STYLES.new
                    }`}
                  >
                    {STATUSES.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-background text-foreground"
                      >
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (confirm("Delete this lead?"))
                        deleteMut.mutate(lead.id);
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                    aria-label="Delete"
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

function LeadForm({
  onSubmit,
  onCancel,
  busy,
}: {
  onSubmit: (v: {
    homeowner_name: string;
    email: string;
    company: string;
    phone: string;
    score: number;
    status: Status;
    notes: string;
    source: string;
  }) => void;
  onCancel: () => void;
  busy: boolean;
}) {
  const [v, setV] = useState({
    homeowner_name: "",
    email: "",
    company: "",
    phone: "",
    score: 50,
    status: "new" as Status,
    notes: "",
    source: "manual",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="mt-6 rounded-2xl border border-border/60 bg-card/60 p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <input
        required
        placeholder="Name *"
        value={v.homeowner_name}
        onChange={(e) => setV({ ...v, homeowner_name: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={v.email}
        onChange={(e) => setV({ ...v, email: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
      />
      <input
        placeholder="Company"
        value={v.company}
        onChange={(e) => setV({ ...v, company: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
      />
      <input
        placeholder="Phone"
        value={v.phone}
        onChange={(e) => setV({ ...v, phone: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
      />
      <div className="flex items-center gap-3">
        <label className="text-xs text-muted-foreground w-12">Score</label>
        <input
          type="range"
          min={0}
          max={100}
          value={v.score}
          onChange={(e) => setV({ ...v, score: Number(e.target.value) })}
          className="flex-1 accent-primary"
        />
        <span className="font-display text-xl w-10 text-right">{v.score}</span>
      </div>
      <select
        value={v.status}
        onChange={(e) => setV({ ...v, status: e.target.value as Status })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Notes"
        value={v.notes}
        onChange={(e) => setV({ ...v, notes: e.target.value })}
        className="md:col-span-2 rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
      />
      <div className="md:col-span-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save lead"}
        </button>
      </div>
    </form>
  );
}
