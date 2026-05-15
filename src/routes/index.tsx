import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Filter,
  Workflow,
  BarChart3,
  Inbox,
  ShieldCheck,
  Check,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Leadflow — Lead management for modern marketing teams" },
      {
        name: "description",
        content:
          "Leadflow turns every inbound lead into a closed deal. A warm, intelligent pipeline built for marketers and founders — not engineers.",
      },
      { property: "og:title", content: "Leadflow — Lead management for modern marketing teams" },
      {
        property: "og:description",
        content:
          "Turn every inbound lead into a closed deal. Warm, intelligent pipeline built for marketers and founders.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-card">
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-xl tracking-tight">Leadflow</span>
        </Link>
        <nav className="hidden items-center gap-9 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#story" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#stories" className="hover:text-foreground transition-colors">Customers</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#login" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            Sign in
          </a>
          <a
            href="#start"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get a demo
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
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Now in private beta — Spring 2026
          </div>

          <h1 className="mt-7 text-balance text-5xl leading-[1.05] tracking-tight md:text-7xl">
            <span className="font-display italic text-gradient-accent">Every lead,</span>
            <br />
            <span className="font-display text-foreground">looked after.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Leadflow is the warm, intelligent pipeline behind ambitious marketing teams.
            It greets your leads, learns what they care about, and hands them to the right
            person — beautifully, every time.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#start"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Get a personal demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-surface-elevated"
            >
              See how it works
            </a>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            14-day trial · No credit card · White-glove onboarding included
          </p>
        </div>

        <InboxPreview />
      </div>
    </section>
  );
}

function InboxPreview() {
  const leads = [
    { name: "Amelia Hart", company: "North & Pine Studio", source: "Instagram ad", score: 94, status: "Hot", tone: "primary" },
    { name: "Jordan Reyes", company: "Cedarwood Coffee Co.", source: "Newsletter signup", score: 78, status: "Warm", tone: "accent" },
    { name: "Priya Shah", company: "Marigold Hotels", source: "Discovery call form", score: 88, status: "Hot", tone: "primary" },
    { name: "Tom Whitaker", company: "Field & Fern", source: "Webinar replay", score: 62, status: "Nurture", tone: "muted" },
  ];
  return (
    <div className="relative mx-auto mt-20 max-w-5xl">
      <div className="rounded-2xl border border-border bg-surface/80 p-1.5 backdrop-blur-xl shadow-card">
        <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          </div>
          <span className="ml-3 text-sm text-muted-foreground">Today's inbox</span>
          <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            4 new this hour
          </span>
        </div>

        <div className="divide-y divide-border/60">
          {leads.map((l) => (
            <div
              key={l.name}
              className="grid grid-cols-12 items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-elevated/60"
            >
              <div className="col-span-12 flex items-center gap-3 md:col-span-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-primary/20 text-sm font-medium text-foreground">
                  {l.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.company}</div>
                </div>
              </div>
              <div className="col-span-6 text-sm text-muted-foreground md:col-span-4">
                via <span className="text-foreground/80">{l.source}</span>
              </div>
              <div className="col-span-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${l.score}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs tabular-nums text-foreground/80">{l.score}</span>
                </div>
              </div>
              <div className="col-span-3 flex justify-end md:col-span-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs ${
                    l.tone === "primary"
                      ? "bg-primary/15 text-primary"
                      : l.tone === "accent"
                      ? "bg-accent/15 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Logos() {
  const names = ["Marigold", "North & Pine", "Cedarwood", "Field & Fern", "Atelier Co.", "Sundial"];
  return (
    <section className="border-y border-border/50 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Loved by 800+ growing brands
        </p>
        <div className="mt-7 grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-6">
          {names.map((n) => (
            <span key={n} className="font-display text-lg tracking-tight text-muted-foreground/80">
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
      icon: Inbox,
      title: "One warm inbox",
      body: "Forms, ads, calls, chats, referrals — every conversation arrives in one beautifully organized place.",
    },
    {
      icon: Filter,
      title: "Intelligent scoring",
      body: "Leadflow learns who actually buys from you and quietly surfaces them at the top of your day.",
    },
    {
      icon: Workflow,
      title: "Effortless handoffs",
      body: "The right lead reaches the right person — by territory, by skill, by mood. No spreadsheets needed.",
    },
    {
      icon: BarChart3,
      title: "Stories, not dashboards",
      body: "Plain-English reports your team will actually read on Monday morning. Beautiful charts included.",
    },
    {
      icon: ShieldCheck,
      title: "Trustworthy by design",
      body: "GDPR, SOC 2, and a privacy posture your customers will respect. Quietly compliant in the background.",
    },
    {
      icon: Sparkles,
      title: "A team that cares",
      body: "Real humans on call, a dedicated success partner, and onboarding that feels like a concierge.",
    },
  ];
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">The platform</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            Built for the people <span className="italic text-gradient-accent">closing the deal.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Not a CRM. Not another inbox. A calm, considered space where every lead gets
            the attention they deserve — and your team gets back their afternoons.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-border bg-surface/60 p-7 transition-all hover:border-primary/30 hover:bg-surface-elevated"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-display text-xl text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  const steps = [
    {
      n: "01",
      title: "Leads arrive, gracefully.",
      body: "Drop in our form, plug in your ad accounts, forward your inbox. Leadflow tidies everything into one warm, unified view.",
    },
    {
      n: "02",
      title: "We get to know them.",
      body: "Each lead is enriched, scored, and routed automatically. Your team wakes up to a list that's already prioritized.",
    },
    {
      n: "03",
      title: "You close, faster.",
      body: "Templates, reminders, and gentle nudges keep every conversation moving — without any of it feeling automated.",
    },
  ];
  return (
    <section id="story" className="relative border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.25em] text-primary">How it works</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
              Three quiet steps <br />
              <span className="italic text-gradient-accent">to a fuller pipeline.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              No engineers required. No five-week implementation. Most of our customers are
              live the same week they sign up — with a real person guiding them through it.
            </p>
            <div className="mt-8">
              <a
                href="#start"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface-elevated"
              >
                Walk me through it <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-7">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-surface/60 p-7 transition-colors hover:bg-surface-elevated"
              >
                <div className="flex items-start gap-5">
                  <div className="font-display text-3xl text-primary/60">{s.n}</div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
                    <p className="mt-2 text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="stories" className="relative border-t border-border/50">
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <Quote className="mx-auto h-8 w-8 text-primary" strokeWidth={1.25} />
        <blockquote className="mt-8 font-display text-3xl leading-snug tracking-tight text-foreground md:text-4xl">
          “Leadflow gave our marketing team back its taste. It feels like a tool a designer
          made for us — not something we have to wrestle with on Monday mornings.”
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-3 text-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
            EM
          </div>
          <div className="text-left">
            <div className="font-medium text-foreground">Elena Marchetti</div>
            <div className="text-muted-foreground">Head of Growth, Marigold Hotels</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Studio",
      price: "$49",
      tag: "per month",
      blurb: "For founders and small marketing teams getting their first hundred leads.",
      features: ["Up to 1,500 leads / mo", "Unified inbox", "Email + Slack alerts", "Standard onboarding"],
      cta: "Start your trial",
      featured: false,
    },
    {
      name: "Atelier",
      price: "$199",
      tag: "per month",
      blurb: "For marketing teams who treat their pipeline like the front door of the brand.",
      features: [
        "Up to 25,000 leads / mo",
        "AI scoring & routing",
        "Dedicated success partner",
        "Concierge onboarding",
        "Custom reports",
      ],
      cta: "Book a demo",
      featured: true,
    },
    {
      name: "House",
      price: "Bespoke",
      tag: "Tailored to you",
      blurb: "For agencies and multi-brand teams who need it shaped around their world.",
      features: ["Unlimited leads & seats", "Multi-brand workspaces", "SOC 2 + custom DPA", "Solutions architect"],
      cta: "Talk with our team",
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">
            Honest pricing, <span className="italic text-gradient-accent">no surprises.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            One flat fee. Every feature. Real humans included.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-colors ${
                t.featured
                  ? "border-primary/40 bg-gradient-to-b from-surface-elevated to-surface shadow-card"
                  : "border-border bg-surface/60 hover:bg-surface-elevated"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most loved
                </span>
              )}
              <div className="font-display text-2xl text-foreground">{t.name}</div>
              <div className="mt-2 text-sm text-muted-foreground">{t.blurb}</div>
              <div className="mt-6 flex items-baseline gap-2">
                <div className="font-display text-5xl tracking-tight">{t.price}</div>
                <div className="text-sm text-muted-foreground">{t.tag}</div>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" strokeWidth={2.25} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-opacity ${
                  t.featured
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
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
    <section id="start" className="relative overflow-hidden border-t border-border/50">
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="font-display text-4xl tracking-tight md:text-6xl">
          Let's give your leads <br />
          <span className="italic text-gradient-accent">the welcome they deserve.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Book a 20-minute walkthrough with one of our founders. We'll set you up,
          import your leads, and stay with you through your first close.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#start"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground hover:shadow-[var(--shadow-glow)]"
          >
            Book a personal demo <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#sales"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-surface-elevated"
          >
            Start a 14-day trial
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2.25} />
          </div>
          <span className="font-display text-base text-foreground">Leadflow</span>
          <span className="text-xs text-muted-foreground">— made with care, 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a href="#" className="hover:text-foreground">Customers</a>
          <a href="#" className="hover:text-foreground">Journal</a>
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
        <Story />
        <Testimonial />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
