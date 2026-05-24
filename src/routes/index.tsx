import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Zap, Target, BarChart3, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Imagv — Automate Your Marketing and Explode Your Lead Generation" },
      {
        name: "description",
        content:
          "Imagv automates your marketing workflows and multiplies your lead generation. Built for modern teams that want results, not complexity.",
      },
      { property: "og:title", content: "Imagv — Marketing Automation That Performs" },
      {
        property: "og:description",
        content: "Automate your marketing and explode your lead generation with Imagv.",
      },
    ],
  }),
});

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight text-white">
          Imagv
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium text-white/80 md:flex">
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#pricing" className="transition-colors hover:text-white">Pricing</a>
          <a href="/login" className="transition-colors hover:text-white">Sign in</a>
        </nav>
        <a
          href="/login"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-display text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          Start Free Trial
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const [email, setEmail] = useState("");

  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-24 text-center md:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
          Automate Your Marketing and Explode Your Lead Generation.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Imagv handles the workflows, the scoring, and the follow-ups — so your team
          spends time on the leads that actually close.
        </p>

        {/* Lead capture */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/login?email=${encodeURIComponent(email)}`;
          }}
          className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-14 flex-1 rounded-md border border-border bg-surface px-5 text-base text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-primary px-8 font-display text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            Start Free Trial
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: Zap,
      title: "Automated Workflows",
      body: "Build multi-step marketing sequences in minutes. Trigger emails, route leads, and update records — all without touching a spreadsheet.",
    },
    {
      icon: Target,
      title: "Intelligent Lead Scoring",
      body: "Imagv learns from your closed deals and surfaces the leads most likely to convert. Your sales team starts every day at the top of the pipeline.",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      body: "Clear, actionable reporting on every campaign and channel. Know exactly what's working — and where to invest next.",
    },
  ];

  return (
    <section id="features" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">
            The Platform
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Everything you need to scale lead generation.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-md border border-navy bg-surface p-8 transition-colors hover:border-primary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy text-primary">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$49",
      blurb: "For founders running their first campaigns.",
      features: ["Up to 1,500 leads / mo", "Automated workflows", "Email support"],
      featured: false,
    },
    {
      name: "Growth",
      price: "$199",
      blurb: "For marketing teams ready to scale.",
      features: [
        "Up to 25,000 leads / mo",
        "AI scoring & routing",
        "Performance analytics",
        "Priority support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      blurb: "For organizations with bespoke needs.",
      features: ["Unlimited leads & seats", "Custom integrations", "Dedicated success manager"],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-primary">
            Pricing
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Simple, transparent pricing.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-md border p-8 ${
                t.featured
                  ? "border-primary bg-surface-elevated"
                  : "border-navy bg-surface"
              }`}
            >
              <h3 className="font-display text-xl font-bold text-white">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold text-white">{t.price}</span>
                {t.price !== "Custom" && (
                  <span className="text-sm text-muted-foreground">/mo</span>
                )}
              </div>
              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/login"
                className={`mt-8 inline-flex h-12 items-center justify-center rounded-md font-display text-sm font-bold transition-opacity hover:opacity-90 ${
                  t.featured
                    ? "bg-primary text-white"
                    : "border border-border bg-transparent text-white"
                }`}
              >
                Start Free Trial
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
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
          Ready to explode your lead generation?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          Join thousands of teams growing faster with Imagv.
        </p>
        <a
          href="/login"
          className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-md bg-primary px-10 font-display text-base font-bold text-white transition-opacity hover:opacity-90"
        >
          Start Free Trial
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="font-display text-xl font-bold text-white">Imagv</div>
        <p className="text-sm text-white/70">© 2026 Imagv. All rights reserved.</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
