import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Filter, Workflow, BarChart3, Webhook, ShieldCheck, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Leadflow — Pipeline software for modern marketing teams" },
      {
        name: "description",
        content:
          "Leadflow captures, scores, and routes inbound leads in real time. Built for marketing teams who treat their pipeline like infrastructure.",
      },
      { property: "og:title", content: "Leadflow — Pipeline software for modern marketing teams" },
      {
        property: "og:description",
        content:
          "Capture, score, and route inbound leads in real time. Built for marketing teams who treat their pipeline like infrastructure.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight">Leadflow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pipeline" className="hover:text-foreground transition-colors">Pipeline</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#login" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            Sign in
          </a>
          <a
            href="#start"
            className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Start free
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            v2.4 — Realtime routing & dedupe
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-gradient">The pipeline layer</span>
            <br />
            <span className="text-foreground">for modern marketing teams.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Leadflow captures every inbound signal, scores it in milliseconds, and routes
            it to the right rep — before the form-fill even animates closed.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#start"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:glow-primary"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface-elevated"
            >
              Read the docs
            </a>
          </div>

          <p className="mt-5 font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> npm i @leadflow/sdk
          </p>
        </div>

        <PipelinePreview />
      </div>
    </section>
  );
}

function PipelinePreview() {
  const stages = [
    { label: "Captured", count: "12,481", tone: "muted" },
    { label: "Enriched", count: "11,902", tone: "muted" },
    { label: "Scored", count: "8,317", tone: "primary" },
    { label: "Routed", count: "8,317", tone: "primary" },
  ];
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="rounded-xl border border-border bg-surface/80 p-1 backdrop-blur-xl shadow-[0_30px_80px_-20px_oklch(0_0_0/0.6)]">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            leadflow / pipeline / live
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            streaming
          </span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stages.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
              <div
                className={`mt-2 font-mono text-2xl font-semibold tabular-nums ${
                  s.tone === "primary" ? "text-primary" : "text-foreground"
                }`}
              >
                {s.count}
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${s.tone === "primary" ? "bg-primary" : "bg-muted-foreground/40"}`}
                  style={{ width: `${60 + Math.random() * 30}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-1 px-4 py-4 font-mono text-xs leading-relaxed">
          <LogLine time="14:02:31" tag="POST" tagClass="text-primary" msg="lead.captured  source=ads/google  utm=q4-launch" />
          <LogLine time="14:02:31" tag="EVAL" tagClass="text-accent" msg="score=87  tier=enterprise  intent=high" />
          <LogLine time="14:02:31" tag="ROUTE" tagClass="text-primary" msg="→ rep=alex.k  sla=00:04:59" />
          <LogLine time="14:02:32" tag="POST" tagClass="text-primary" msg="lead.captured  source=webinar/replay" />
        </div>
      </div>
    </div>
  );
}

function LogLine({ time, tag, tagClass, msg }: { time: string; tag: string; tagClass: string; msg: string }) {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <span className="text-muted-foreground/60">{time}</span>
      <span className={`w-12 ${tagClass}`}>{tag}</span>
      <span className="text-foreground/80">{msg}</span>
    </div>
  );
}

function Logos() {
  const names = ["RAMP", "LINEAR", "VERCEL", "RETOOL", "SUPABASE", "PLAID"];
  return (
    <section className="border-y border-border/60 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Pipelines powering teams at
        </p>
        <div className="mt-6 grid grid-cols-3 items-center justify-items-center gap-8 md:grid-cols-6">
          {names.map((n) => (
            <span key={n} className="font-mono text-sm tracking-widest text-muted-foreground/70">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Webhook,
      title: "Universal capture",
      body: "Forms, ads, webinars, calls, chat, webhooks. One ingestion API, every source normalized.",
    },
    {
      icon: Filter,
      title: "Realtime scoring",
      body: "Run rules, ML models, or your own functions on every lead — sub-50ms p99.",
    },
    {
      icon: Workflow,
      title: "Deterministic routing",
      body: "Round-robin, territory, account-based. Audit every assignment with a full event log.",
    },
    {
      icon: BarChart3,
      title: "Pipeline analytics",
      body: "Funnel, velocity, source attribution. Query directly with SQL or your BI tool of choice.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance built-in",
      body: "GDPR, SOC 2 Type II, HIPAA-ready. Region pinning and field-level encryption.",
    },
    {
      icon: Zap,
      title: "Edge-deployed",
      body: "Capture endpoints in 30+ regions. Your forms stay fast, your pipeline stays global.",
    },
  ];
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">// Platform</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Pipeline as infrastructure.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Six primitives. Composable. Observable. Built to be the system of record for
            every lead your company touches.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative bg-surface/60 p-7 transition-colors hover:bg-surface-elevated"
            >
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
              <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeBlock() {
  return (
    <section id="pipeline" className="relative border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">// SDK</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            One function call,<br />the entire pipeline runs.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drop the SDK in your form handler. Leadflow handles enrichment, scoring,
            dedupe, routing, and notification — synchronously or async, your call.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Type-safe TypeScript and Python clients",
              "Idempotency keys & exactly-once delivery",
              "Replay any event from the last 90 days",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface/80 p-1 shadow-[0_30px_80px_-20px_oklch(0_0_0/0.6)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
            <span>capture.ts</span>
            <span className="text-primary">TypeScript</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
{`import { Leadflow } from "@leadflow/sdk";

const lf = new Leadflow(process.env.LF_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const lead = await lf.capture({
    source: "site/contact",
    payload: data,
    score: { model: "intent-v3" },
    route: { strategy: "round-robin" },
  });

  return Response.json({ id: lead.id });
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Hobby",
      price: "$0",
      tag: "Forever",
      features: ["1k leads / month", "Basic routing", "Community support"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Team",
      price: "$99",
      tag: "per month",
      features: ["50k leads / month", "ML scoring & enrichment", "Slack & webhook alerts", "Priority support"],
      cta: "Start trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      tag: "Volume + SLA",
      features: ["Unlimited leads", "Dedicated regions", "SOC 2 + DPA", "Solutions engineer"],
      cta: "Talk to sales",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">// Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Usage-based. No per-seat tax.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-xl border p-7 transition-colors ${
                t.featured
                  ? "border-primary/40 bg-surface-elevated"
                  : "border-border bg-surface/60 hover:bg-surface-elevated"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-2.5 left-7 rounded-full bg-primary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                  Recommended
                </span>
              )}
              <div className="text-sm font-medium text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-3xl font-semibold tracking-tight">{t.price}</div>
                <div className="text-xs text-muted-foreground">{t.tag}</div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={`mt-7 inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-opacity ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border bg-surface text-foreground hover:bg-surface-elevated"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="start" className="relative overflow-hidden border-t border-border/60">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Ship your pipeline <span className="text-gradient-accent">this afternoon.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Free up to 1,000 leads per month. No credit card. Production-ready in 10 minutes.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#start"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:glow-primary"
          >
            Start free <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#sales"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur hover:bg-surface-elevated"
          >
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          <span className="font-mono text-xs">leadflow.dev — © 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#" className="hover:text-foreground">Status</a>
          <a href="#" className="hover:text-foreground">Changelog</a>
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Features />
        <CodeBlock />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
