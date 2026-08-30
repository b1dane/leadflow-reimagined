import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, ArrowRight, ChevronDown, Shield, Zap, Calendar, Activity, BarChart3, Smartphone, Phone } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — VeloSys | $200/month, Everything Included" },
      {
        name: "description",
        content:
          "Simple pricing for contractors. $200/month. No contracts. Cancel anytime. Everything included — instant lead response, smart qualification, appointment booking.",
      },
      { property: "og:title", content: "Pricing — VeloSys" },
      {
        property: "og:description",
        content: "Simple pricing. Everything included. $200/month. No contracts.",
      },
    ],
  }),
});

const FEATURES = [
  { icon: Zap, label: "Instant lead response (SMS)" },
  { icon: BarChart3, label: "Smart lead qualification" },
  { icon: Calendar, label: "Appointment booking" },
  { icon: Activity, label: "One dashboard for all leads" },
  { icon: Shield, label: "24/7 coverage" },
  { icon: Smartphone, label: "Unlimited leads" },
  { icon: CheckCircle, label: "Unlimited team members" },
  { icon: CheckCircle, label: "No contracts" },
];

const FAQS = [
  {
    q: "What happens if I need more than what's included?",
    a: "Everything is included. Same price. There are no tiers, no add-ons, no hidden costs.",
  },
  {
    q: "Can I try before I buy?",
    a: "Absolutely. Start with a 14-day free trial. No credit card required. No commitment.",
  },
  {
    q: "What if I want to cancel?",
    a: "Cancel anytime from your dashboard. No questions asked. No cancellation fees. You keep access through the end of your billing period.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fee. You pay $200/month. That's it. We'll help you connect your number in under 10 minutes.",
  },
  {
    q: "Can I use my existing phone number?",
    a: "Yes. You keep your current number. We just route your texts through VeloSys. Nothing changes for your customers.",
  },
];

function PricingPage() {
  return (
    <>
      {/* HERO (dark) */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "rgba(29,78,216,0.1)", filter: "blur(120px)" }} />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Pricing
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ color: "#E5E7EB" }}>
            Simple pricing.
            <br />
            Everything included.{" "}
            <span style={{ color: "#1D4ED8" }}>$200/month.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
            One plan. One price. No tiers, no add-ons, no surprises.
            You get every feature VeloSys has to offer.
          </p>
        </div>
      </section>

      {/* PLAN CARD (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-lg">
            <div className="card-light rounded-2xl p-8 md:p-12">
              {/* Price */}
              <div className="text-center">
                <p className="text-6xl font-bold" style={{ color: "#1F2937" }}>
                  $200
                  <span className="text-2xl font-normal" style={{ color: "#6B7280" }}>/month</span>
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
                  No contracts &middot; Cancel anytime
                </p>
              </div>

              {/* Features */}
              <ul className="mt-10 space-y-4">
                {FEATURES.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md" style={{ backgroundColor: "rgba(5,150,105,0.1)" }}>
                      <Icon className="h-4 w-4" style={{ color: "#059669" }} strokeWidth={2} />
                    </div>
                    <span className="text-sm" style={{ color: "#1F2937" }}>{label}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10 text-center">
                <a
                  href="mailto:ops@velosys.io?subject=Start%20VeloSys%20trial&body=I%20want%20to%20start%20my%2014-day%20free%20trial%20of%20VeloSys."
                  className="btn-primary w-full sm:w-auto font-semibold text-sm uppercase tracking-wider"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
                  14-day trial &middot; No credit card required
                </p>
              </div>
            </div>

            {/* Comparison note */}
            <div className="mt-8 rounded-xl p-6 text-center card-light">
              <p className="text-sm" style={{ color: "#6B7280" }}>
                Compared to competitors charging $300–$800+/mo with long contracts and complex setup,
                VeloSys gives you everything for a flat $200. No surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-24">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl" style={{ color: "#1F2937" }}>
            Still have questions?
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map(({ q, a }) => (
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
          <div className="mt-10 text-center">
            <Link
              to="/faq"
              className="text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors" style={{ color: "#1D4ED8" }}
            >
              View all FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}