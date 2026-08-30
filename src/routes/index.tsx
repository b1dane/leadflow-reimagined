import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Zap,
  Calendar,
  BarChart3,
  Smartphone,
  Phone,
  Activity,
  ChevronDown,
  Clock,
  Star,
  Shield,
} from "lucide-react";
import { submitIntake } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VeloSys — Lead Response for Contractors" },
      {
        name: "description",
        content:
          "Tool that texts your leads back instantly. Qualifies them, books appointments, and never misses a call.",
      },
      { property: "og:title", content: "VeloSys — Lead Response for Contractors" },
      {
        property: "og:description",
        content:
          "Tool that texts your leads back instantly. Never miss a customer again.",
      },
    ],
  }),
});

/* ── HERO SECTION (dark) ── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24" style={{ backgroundColor: "#000000" }}>
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "rgba(29,78,216,0.1)", filter: "blur(120px)" }} />
      <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full" style={{ background: "rgba(245,158,11,0.12)", filter: "blur(100px)" }} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
          {/* Left: Copy */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
              // Never miss a lead again
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl" style={{ color: "#E5E7EB" }}>
              You're on a job. Your leads are being texted right now{" "}
              <span style={{ color: "#1D4ED8" }}>— by a tool.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed md:text-xl" style={{ color: "#9CA3AF" }}>
              VeloSys texts every lead back instantly. Qualifies them.
              Books the appointment. You just show up and do the work.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 md:justify-start">
              <a
                href="#get-started"
                className="btn-primary w-full sm:w-auto font-semibold text-sm uppercase tracking-wider"
              >
                Get more leads
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+183****0199"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-7 text-sm font-semibold transition-colors"
                style={{ color: "#E5E7EB", border: "2px solid rgba(255,255,255,0.15)" }}
              >
                <Phone className="h-4 w-4" />
                (832) 555-0199
              </a>
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
              No contracts &middot; $200/mo &middot; Cancel anytime
            </p>
          </div>

          {/* Right: Conversation visual */}
          <div className="flex-1 w-full max-w-sm mx-auto md:mx-0">
            <ConversationScreenshot />
          </div>
        </div>
      </div>
    </section>
  );
}

function ConversationScreenshot() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(29,78,216,0.2)" }}>
          <MessageSquare className="h-5 w-5" style={{ color: "#1D4ED8" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#E5E7EB" }}>VeloSys</p>
          <p className="text-[10px]" style={{ color: "#9CA3AF" }}>Online · Responds in seconds</p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 p-4">
        {/* Incoming lead */}
        <div className="flex items-start gap-2">
          <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-sm" style={{ color: "#E5E7EB" }}>
              My AC went out. It's 95 degrees in my house. Can someone come take a look today?
            </p>
            <p className="mt-1 text-right text-[10px]" style={{ color: "rgba(156,163,175,0.6)" }}>3:14 PM</p>
          </div>
        </div>

        {/* Tool response */}
        <div className="flex items-start justify-end gap-2">
          <div className="rounded-2xl rounded-br-sm gradient-cta px-4 py-2.5 max-w-[85%]">
            <p className="text-sm text-white">
              Hi! Sorry about the heat — that's rough. Yes, we can get someone out today. What's your zip code, and is now a good time for our team to call?
            </p>
            <p className="mt-1 text-right text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>3:14 PM · Tool</p>
          </div>
        </div>

        {/* Lead reply */}
        <div className="flex items-start gap-2">
          <div className="rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[85%]" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-sm" style={{ color: "#E5E7EB" }}>
              77002. Yeah, call anytime.
            </p>
            <p className="mt-1 text-right text-[10px]" style={{ color: "rgba(156,163,175,0.6)" }}>3:15 PM</p>
          </div>
        </div>

        {/* Tool confirmation */}
        <div className="flex items-start justify-end gap-2">
          <div className="rounded-2xl rounded-br-sm gradient-cta px-4 py-2.5 max-w-[85%]">
            <p className="text-sm text-white">
              Got it. I've scheduled a technician to come by between 4-6 PM today. You'll get a text when they're on the way. {/* z } */}
            </p>
            <p className="mt-1 text-right text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>3:15 PM · Tool</p>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-lg p-3 border" style={{ borderColor: "rgba(5,150,105,0.3)", backgroundColor: "rgba(5,150,105,0.05)" }}>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" style={{ color: "#059669" }} />
            <span className="text-[11px] font-semibold" style={{ color: "#059669" }}>Appointment booked</span>
          </div>
          <p className="mt-1 text-[10px]" style={{ color: "#9CA3AF" }}>
            AC repair · Today 4-6 PM · Houston, TX
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── SOCIAL PROOF STRIP (light) ── */
function SocialProof() {
  return (
    <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#6B7280" }}>
          Trusted by contractors across Houston & beyond
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {[
            { icon: Star, label: "100+ leads responded daily" },
            { icon: Clock, label: "Responds in under 8 seconds" },
            { icon: Shield, label: "24/7 coverage" },
            { icon: CheckCircle, label: "No contracts" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4" style={{ color: "#1D4ED8" }} />
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PROBLEM SECTION (light) ── */
function Problem() {
  return (
    <section className="relative border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
      <div className="relative mx-auto max-w-6xl px-6 section-padding">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // The problem
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            A leaky pipe. A broken AC.
            <br />
            Your phone rings while you're on a job.
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "#6B7280" }}>
            You can't answer. It goes to voicemail. That customer calls your competitor.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              stat: "78%",
              label: "of customers hire the first contractor who responds",
              source: "US Tech Automations, 2026",
            },
            {
              stat: "12%",
              label: "of contractors respond within 5 minutes of a lead",
              source: "Industry benchmark",
            },
            {
              stat: "Voicemail",
              label: "is where your leads go while you're working",
              source: "Every single job site",
            },
          ].map(({ stat, label, source }) => (
            <div
              key={stat}
              className="card-light rounded-xl p-6 text-center md:p-8"
            >
              <p className="text-4xl font-bold md:text-5xl" style={{ color: "#1D4ED8" }}>
                {stat}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#1F2937" }}>
                {label}
              </p>
              <p className="mt-2 text-[10px] font-semibold" style={{ color: "#9CA3AF" }}>
                {source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 mx-auto max-w-xl rounded-xl p-6 text-center card-light">
          <p className="text-sm" style={{ color: "#6B7280" }}>
            You pay for leads &mdash; Google LSA, Angi, Thumbtack, your website. Then they go to
            voicemail while you're working. Every missed call is money you already spent.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS (light) ── */
function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Phone,
      title: "Connect your number",
      desc: "Link your existing phone number to VeloSys. Nothing to install. Takes 5 minutes.",
    },
    {
      step: "02",
      icon: MessageSquare,
      title: "Responds instantly",
      desc: "Every text, every call &mdash; answered in seconds. The tool qualifies, answers questions, and books jobs.",
    },
    {
      step: "03",
      icon: Calendar,
      title: "Booked appointments show up",
      desc: "Appointments land in your calendar. You get a notification. You just show up and work.",
    },
  ];

  return (
    <section id="how-it-works" className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6 section-padding">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            Three steps. No training. Nothing to install.
          </h2>
          <p className="mt-4" style={{ color: "#6B7280" }}>
            From setup to your first booked job in under 10 minutes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full gradient-cta">
                <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-sm font-semibold" style={{ color: "#1D4ED8" }}>{step}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold" style={{ color: "#1F2937" }}>
                {title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "#6B7280" }}
                dangerouslySetInnerHTML={{ __html: desc }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FEATURES (light) ── */
function Features() {
  const features = [
    {
      icon: Zap,
      title: "Instant response",
      desc: "Texts every lead back in under 8 seconds. Not 5 minutes. Not 5 hours. 8 seconds. Every time.",
    },
    {
      icon: BarChart3,
      title: "Smart qualification",
      desc: "The tool asks what service, how urgent, when they're available. You get qualified leads, not tire-kickers.",
    },
    {
      icon: Calendar,
      title: "Appointment booking",
      desc: "Books directly into your calendar. You get a notification: New job, Thursday 2 PM, water heater repair.",
    },
    {
      icon: Activity,
      title: "One dashboard",
      desc: "Every lead, every conversation, every booking. Your whole pipeline in one place.",
    },
    {
      icon: Smartphone,
      title: "Works while you work",
      desc: "24/7. Holidays. While you're on a roof, in a crawlspace, or sleeping. Never miss a lead.",
    },
  ];

  return (
    <section id="features" className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
      <div className="relative mx-auto max-w-6xl px-6 section-padding">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Features
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            What you get with VeloSys
          </h2>
          <p className="mt-4" style={{ color: "#6B7280" }}>
            One tool. One price. Everything you need.
          </p>
        </div>

        <div className="mt-16 space-y-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card-light flex flex-col gap-4 rounded-xl p-6 transition-shadow md:flex-row md:items-start md:gap-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg" style={{ border: "1px solid rgba(29,78,216,0.4)", backgroundColor: "rgba(29,78,216,0.1)", color: "#1D4ED8" }}>
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "#1F2937" }}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B7280" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CASE STUDY (light) ── */
function ProofSection() {
  return (
    <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-6xl px-6 section-padding">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Case study
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            See what happens with VeloSys
          </h2>
          <p className="mt-4" style={{ color: "#6B7280" }}>
            Real results from an actual HVAC contractor in Houston.
          </p>
        </div>

        <div className="mt-16 mx-auto max-w-4xl">
          <div className="card-light rounded-2xl p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
              {/* Before / After numbers */}
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>Before</p>
                <div className="mt-3 space-y-4">
                  <div className="rounded-lg p-4 border" style={{ borderColor: "rgba(220,38,38,0.3)", backgroundColor: "rgba(220,38,38,0.04)" }}>
                    <p className="text-2xl font-bold" style={{ color: "#DC2626" }}>
                      22% of calls missed
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                      One in five customers calling never got through to a person.
                    </p>
                  </div>
                  <div className="rounded-lg p-4 card-light">
                    <p className="text-2xl font-bold" style={{ color: "#1F2937" }}>
                      15+ min avg. response
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                      When someone did get a call back, the customer had already moved on.
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center justify-center">
                <ArrowRight className="h-8 w-8" style={{ color: "#1D4ED8" }} />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#059669" }}>After 30 days with VeloSys</p>
                <div className="mt-3 space-y-4">
                  <div className="rounded-lg p-4 border" style={{ borderColor: "rgba(5,150,105,0.3)", backgroundColor: "rgba(5,150,105,0.04)" }}>
                    <p className="text-2xl font-bold" style={{ color: "#059669" }}>
                      100% of leads responded
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                      Every single lead got a response in under 10 seconds.
                    </p>
                  </div>
                  <div className="rounded-lg p-4 border" style={{ borderColor: "rgba(5,150,105,0.3)", backgroundColor: "rgba(5,150,105,0.04)" }}>
                    <p className="text-2xl font-bold" style={{ color: "#059669" }}>
                      40% more booked jobs
                    </p>
                    <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                      More appointments booked. More jobs completed. More revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E5E7EB" }}>
              <p className="text-sm italic" style={{ color: "#6B7280" }}>
                &ldquo;I was losing jobs while I was on other jobs. Now VeloSys handles the front end. I just
                show up, fix the problem, and move to the next one.&rdquo;
              </p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
                &mdash; HVAC contractor, Houston, TX
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PRICING PREVIEW (light) ── */
function PricingPreview() {
  return (
    <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
      <div className="mx-auto max-w-6xl px-6 section-padding">
        <div className="card-light mx-auto max-w-xl rounded-2xl p-8 text-center md:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Pricing
          </p>
          <p className="mt-4 text-4xl font-bold md:text-5xl" style={{ color: "#1F2937" }}>
            $200
            <span className="text-lg font-normal" style={{ color: "#6B7280" }}>/month</span>
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
            No contracts &middot; Cancel anytime &middot; Everything included
          </p>
          <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left">
            {[
              "Instant lead response",
              "Smart lead qualification",
              "Appointment booking",
              "One dashboard for all leads",
              "24/7 coverage",
              "Unlimited leads & team members",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "#1F2937" }}>
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#059669" }} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/pricing"
              className="btn-primary w-full sm:w-auto font-semibold text-sm uppercase tracking-wider"
            >
              See full pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ (light) ── */
function FAQ() {
  const faqs = [
    {
      q: "How fast does it respond?",
      a: "Under 8 seconds, 24/7. Whether it's 2 PM on a Tuesday or 3 AM on Sunday, every lead gets an instant response.",
    },
    {
      q: "What if a lead needs a human?",
      a: "The tool hands off to you immediately when needed. You get a notification and take over the conversation right from your phone.",
    },
    {
      q: "What tools do I need to get started?",
      a: "Just a phone number. Nothing to install, nothing to configure. You link your number and it starts working immediately.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. No contracts. No cancellation fees. No hidden penalties. You're in control.",
    },
    {
      q: "Which contractors is this for?",
      a: "Plumbers, HVAC, roofers, electricians, junk removal, landscapers, painters — any home-service trade that takes leads by phone or text.",
    },
    {
      q: "How is this different from [competitor]?",
      a: "VeloSys has one purpose: respond to every lead instantly. No complex software stack. No add-on costs. No per-user fees. $200 flat, everything included.",
    },
  ];

  return (
    <section id="faq" className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
      <div className="mx-auto max-w-3xl px-6 section-padding">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            Questions? We've got answers.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group card-light rounded-xl transition-shadow"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-medium" style={{ color: "#1F2937" }}>
                {q}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: "#6B7280" }} />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── LEAD FLOW / INTAKE FORM (light) ── */
function LeadFlow() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Lead Response" });
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const send = useServerFn(submitIntake);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await send({ data: { name: form.name, phone: form.phone, email: form.email, service: form.service } });
      setStatus("ok");
      setForm({ name: "", phone: "", email: "", service: "Lead Response" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="get-started" className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 section-padding md:grid-cols-2 md:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Get started
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            Stop missing leads.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: "#6B7280" }}>
            Get started with VeloSys. No credit card required. Cancel anytime.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Zap, t: "5-min setup" },
              { icon: CheckCircle, t: "No contracts" },
              { icon: Activity, t: "Real-time" },
              { icon: Clock, t: "24/7 coverage" },
            ].map(({ icon: Icon, t }) => (
              <div
                key={t}
                className="card-light flex items-center gap-3 rounded-md px-4 py-3"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} style={{ color: "#1D4ED8" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#1F2937" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="card-light rounded-xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between pb-4 border-b" style={{ borderColor: "#E5E7EB" }}>
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#1F2937" }}>
              Get in touch
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
              <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
                Service
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="h-12 w-full rounded-lg px-4 text-sm border"
                style={{ color: "#1F2937", borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
              >
                <option>Lead Response</option>
                <option>HVAC / Plumbing</option>
                <option>Roofing / Construction</option>
                <option>Junk Removal / Landscaping</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-6 btn-primary w-full font-semibold text-sm uppercase tracking-wider disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Get more leads"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {status === "ok" && (
            <p className="mt-4 text-center text-xs font-semibold" style={{ color: "#1D4ED8" }}>
              ✓ Thanks! We'll reach out within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-xs" style={{ color: "#DC2626" }}>
              Something went wrong. Email us at ops@velosys.io.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ── STICKY MOBILE CTA BAR ── */
function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t md:hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)" }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <a
          href="tel:+183****0199"
          className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ color: "#E5E7EB", border: "2px solid rgba(255,255,255,0.15)" }}
        >
          <Phone className="h-4 w-4" />
          Call now
        </a>
        <a
          href="#get-started"
          className="btn-primary flex-1 font-semibold text-sm uppercase tracking-wider"
        >
          Get more leads
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

/* ── FIELD COMPONENT ── */
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
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg px-4 text-sm border"
        style={{ color: "#1F2937", borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
      />
    </div>
  );
}

/* ── INDEX PAGE ── */
function Index() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <Features />
      <ProofSection />
      <PricingPreview />
      <FAQ />
      <LeadFlow />
      <MobileStickyCTA />
    </>
  );
}