import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Activity, Cpu, LineChart, Shield, Zap, Radar, CheckCircle2 } from "lucide-react";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Velocity Systems — Deploying the Velocity Protocol" },
      {
        name: "description",
        content:
          "Velocity Systems deploys the Velocity Protocol — automated lead intelligence and tactical growth systems engineered for small businesses.",
      },
      { property: "og:title", content: "Velocity Systems — Velocity Protocol" },
      {
        property: "og:description",
        content: "Automated lead intelligence and tactical growth systems for small businesses.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-cta">
            <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-bold tracking-widest text-foreground">
            VELOCITY
          </span>
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium text-muted-foreground md:flex">
          <a href="#protocol" className="transition-colors hover:text-foreground">Protocol</a>
          <a href="#systems" className="transition-colors hover:text-foreground">Systems</a>
          <a href="#leadflow" className="transition-colors hover:text-foreground">LeadFlow</a>
          <a href="/login" className="transition-colors hover:text-foreground">Sign in</a>
        </nav>
        <a
          href="#leadflow"
          className="inline-flex items-center gap-2 rounded-md gradient-cta px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
        >
          Deploy
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />
      <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-purple/15 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-electric">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-electric" />
            Protocol Online · v4.2
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Velocity Systems:
            <br />
            <span className="bg-gradient-to-r from-electric via-white to-purple bg-clip-text text-transparent">
              Deploying the Velocity Protocol.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            We provide small businesses with automated lead intelligence and tactical growth
            systems.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#leadflow"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md gradient-cta px-7 font-display text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_40px_-10px_rgba(29,78,216,0.6)] transition-opacity hover:opacity-90"
            >
              Initiate LeadFlow
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#protocol"
              className="inline-flex h-12 items-center justify-center rounded-md border border-purple/50 bg-white/[0.02] px-7 font-display text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-white/[0.04]"
            >
              View Protocol
            </a>
          </div>

          {/* Telemetry strip */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-lg border border-border/60 bg-border/40">
            {[
              { v: "3.4×", l: "Pipeline Lift" },
              { v: "<8 min", l: "Lead Response" },
              { v: "99.97%", l: "Uptime" },
            ].map((s) => (
              <div key={s.l} className="bg-black/80 px-4 py-5">
                <div className="font-display text-2xl font-bold text-foreground">{s.v}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Protocol() {
  const modules = [
    {
      icon: Radar,
      code: "01 / SIGNAL",
      title: "Intent Detection",
      body: "Continuous monitoring across web, social, and intent data surfaces prospects the moment they're ready.",
    },
    {
      icon: Cpu,
      code: "02 / ENGINE",
      title: "Automated Qualification",
      body: "The Protocol scores, enriches, and routes every lead in under 8 minutes — no humans in the loop.",
    },
    {
      icon: LineChart,
      code: "03 / OUTPUT",
      title: "Tactical Growth",
      body: "Verified, sales-ready opportunities delivered to your pipeline with full attribution and forecast clarity.",
    },
  ];

  return (
    <section id="protocol" className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">
            // The Velocity Protocol
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            One engine. Three deployments.
          </h2>
          <p className="mt-4 text-muted-foreground">
            A tightly-integrated system replacing five disconnected tools and a manual SDR team.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/40 md:grid-cols-3">
          {modules.map(({ icon: Icon, code, title, body }) => (
            <div
              key={code}
              className="group relative bg-black/80 p-8 transition-colors hover:bg-surface-elevated"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md border border-electric/40 bg-electric/10 text-electric">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {code}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Systems() {
  const rows = [
    { label: "Latency, lead → SDR", legacy: "4–48 hrs", velocity: "< 8 min" },
    { label: "Qualification accuracy", legacy: "~38%", velocity: "94%" },
    { label: "Tools required", legacy: "5–9", velocity: "1" },
    { label: "Forecast variance", legacy: "±32%", velocity: "±6%" },
  ];

  return (
    <section id="systems" className="relative border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">
              // Performance Delta
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Legacy stacks vs. the Protocol.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No fluff. Measured against the median small-business marketing stack across 240
              deployments.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Zero-config deployment in 72 hours",
                "Single source of truth across teams",
                "SOC 2 Type II infrastructure",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-xl p-2">
            <div className="rounded-lg bg-black/60 p-6">
              <div className="mb-5 flex items-center justify-between border-b border-border/60 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Benchmark · 2026
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-electric">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" /> Live
                </span>
              </div>
              <div className="space-y-4">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-3 items-center gap-3 text-sm">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="text-right font-mono text-muted-foreground/70 line-through">
                      {r.legacy}
                    </span>
                    <span className="text-right font-display font-bold text-electric">
                      {r.velocity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadFlow() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Lead Intelligence" });
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("ok");
      setForm({ name: "", phone: "", email: "", service: "Lead Intelligence" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="leadflow" className="relative border-t border-border/60">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-electric">
            // LeadFlow · Intake
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Deploy the Protocol to your pipeline.
          </h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Submit your intake. A systems engineer will provision your deployment within one business
            day. No sales calls, no decks.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Zap, t: "72hr deploy" },
              { icon: Shield, t: "SOC 2 II" },
              { icon: Activity, t: "Real-time ops" },
              { icon: Cpu, t: "API-native" },
            ].map(({ icon: Icon, t }) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-md border border-border/60 bg-white/[0.02] px-4 py-3"
              >
                <Icon className="h-4 w-4 text-electric" strokeWidth={2} />
                <span className="font-mono text-xs uppercase tracking-wider text-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
              LeadFlow Intake
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-electric">
              Secure · Encrypted
            </span>
          </div>

          <div className="space-y-4">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Jane Doe"
              required
            />
            <Field
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="+1 555 010 0199"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="jane@company.com"
              required
            />
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Service
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="h-12 w-full rounded-md border border-border bg-white/[0.03] px-4 text-sm text-foreground focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
              >
                <option>Lead Intelligence</option>
                <option>Tactical Growth System</option>
                <option>Full Protocol Deployment</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md gradient-cta font-display text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_40px_-10px_rgba(29,78,216,0.6)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Transmitting..." : "Initiate Deployment"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {status === "ok" && (
            <p className="mt-4 text-center font-mono text-xs text-electric">
              ✓ Intake received. A systems engineer will reach out within 24h.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center font-mono text-xs text-destructive">
              Transmission failed. Retry or email ops@velocitysystems.io.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-border bg-white/[0.03] px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-black/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md gradient-cta">
            <Activity className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-sm font-bold tracking-widest text-foreground">
            VELOCITY SYSTEMS
          </span>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          © 2026 · IMAGITV Protocol v4.2
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Protocol />
        <Systems />
        <LeadFlow />
      </main>
      <Footer />
    </div>
  );
}
