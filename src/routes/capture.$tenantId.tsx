import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";
import { captureLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/capture/$tenantId")({
  component: CapturePage,
  head: () => ({ meta: [{ title: "Get in touch — VeloSys" }] }),
});

function CapturePage() {
  const { tenantId } = Route.useParams();
  const send = useServerFn(captureLead);
  const [v, setV] = useState({
    homeowner_name: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await send({
        data: {
          tenant_id: tenantId,
          homeowner_name: v.homeowner_name,
          email: v.email,
          company: v.company,
          phone: v.phone,
          notes: v.notes,
          source: "capture-form",
        },
      });
      setDone(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not submit");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-background bg-grain flex items-center justify-center px-6 py-12">
      <div className="absolute inset-x-0 top-0 h-[480px] hero-glow pointer-events-none" />
      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex items-center gap-2.5 justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-card">
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-2xl tracking-tight">
            Get in touch
          </span>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 shadow-card">
          {done ? (
            <div className="text-center py-8">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-3xl text-gradient">
                Thank you.
              </h1>
              <p className="mt-2 text-muted-foreground">
                We&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl text-gradient">
                Tell us about you.
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll get back within one business day.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-3">
                <input
                  required
                  placeholder="Your name *"
                  value={v.homeowner_name}
                  onChange={(e) =>
                    setV({ ...v, homeowner_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={v.email}
                  onChange={(e) => setV({ ...v, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Company"
                  value={v.company}
                  onChange={(e) => setV({ ...v, company: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
                <input
                  placeholder="Phone"
                  value={v.phone}
                  onChange={(e) => setV({ ...v, phone: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm"
                />
                <textarea
                  placeholder="How can we help?"
                  value={v.notes}
                  onChange={(e) => setV({ ...v, notes: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm min-h-[100px]"
                />
                {err && <p className="text-sm text-destructive">{err}</p>}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60"
                >
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
