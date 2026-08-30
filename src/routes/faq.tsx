import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — VeloSys | Answers to Common Questions" },
      {
        name: "description",
        content:
          "Find answers about VeloSys AI lead response: how fast it responds, setup time, pricing, cancellation, data security, and more.",
      },
      { property: "og:title", content: "FAQ — VeloSys" },
      {
        property: "og:description",
        content: "Answers to common questions about VeloSys AI lead response for contractors.",
      },
    ],
  }),
});

const FAQ_CATEGORIES = [
  {
    category: "General",
    questions: [
      {
        q: "What is VeloSys?",
        a: "VeloSys is an AI that texts your leads back instantly. When a customer texts or calls, the AI responds in under 8 seconds — qualifies them, answers questions, and books the appointment. You keep working while the AI handles the front end.",
      },
      {
        q: "Who is VeloSys for?",
        a: "Home-service contractors who take leads by phone or text: plumbers, HVAC, roofers, electricians, junk removal, landscapers, painters, and any other trade where speed-to-lead matters.",
      },
      {
        q: "How is this different from other AI tools?",
        a: "VeloSys has one focus: respond to every lead instantly. No complex software suite. No add-on costs. No per-user fees. Single plan, $200/month, everything included. Most competitors charge more, require contracts, or sell you a platform with features you don't need.",
      },
    ],
  },
  {
    category: "Setup & Integration",
    questions: [
      {
        q: "How long does setup take?",
        a: "About 5 minutes. You connect your existing phone number to VeloSys, and the AI starts responding immediately. No hardware. No installation. No training.",
      },
      {
        q: "Do I need to install anything?",
        a: "No. VeloSys works with your existing phone number. There's nothing to download, no hardware to install, no software to configure.",
      },
      {
        q: "Will it work with my existing phone number?",
        a: "Yes. You keep your current number. Your customers text and call the same number they always have. We route the messages through VeloSys on our end.",
      },
      {
        q: "Can I integrate with ServiceTitan, Jobber, or Housecall Pro?",
        a: "Yes. VeloSys can connect with your existing tools. Contact us for details on specific integrations.",
      },
    ],
  },
  {
    category: "Pricing & Billing",
    questions: [
      {
        q: "How much does VeloSys cost?",
        a: "$200/month. One plan. Everything included. No tiers, no add-ons, no hidden fees.",
      },
      {
        q: "Is there a contract?",
        a: "No. Month-to-month. You can cancel anytime with no penalty.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Cancel from your dashboard. No questions asked. No fees. You keep access through the end of your billing period.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes. 14-day free trial. No credit card required. If VeloSys isn't right for you, cancel before the trial ends and you pay nothing.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "How fast does the AI respond?",
        a: "Under 8 seconds, 24/7. Whether it's 2 PM on a Tuesday or 2 AM on a Sunday, every lead gets an instant response. Industry research shows responding within 60 seconds makes you 391% more likely to convert.",
      },
      {
        q: "What if a lead asks something the AI can't answer?",
        a: "The AI hands off to you immediately. You get a notification and take over the conversation from your phone or dashboard. No lost leads, no awkward AI replies.",
      },
      {
        q: "Can I see the AI's conversations?",
        a: "Yes. Every conversation is logged in your VeloSys dashboard. You can read the full history, see what the AI said, and jump in anytime.",
      },
      {
        q: "Is my data secure?",
        a: "Yes. All conversations are encrypted in transit and at rest. We never share or sell your data or your customers' data. VeloSys uses industry-standard security practices.",
      },
      {
        q: "What phone numbers work with VeloSys?",
        a: "Any US or Canada phone number that can receive SMS and calls. We'll help you with the porting or forwarding process during setup.",
      },
    ],
  },
];

function FAQPage() {
  return (
    <>
      {/* HERO (dark) */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "rgba(29,78,216,0.1)", filter: "blur(120px)" }} />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // FAQ
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ color: "#E5E7EB" }}>
            Frequently asked questions.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
            Everything you need to know about VeloSys. If you don't see your question here, reach out.
          </p>
        </div>
      </section>

      {/* FAQ SECTIONS (light) */}
      {FAQ_CATEGORIES.map(({ category, questions }) => (
        <section key={category} className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
              {category}
            </h2>
            <div className="mt-8 space-y-4">
              {questions.map(({ q, a }) => (
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
      ))}

      {/* FINAL CTA (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            Still have questions?
          </h2>
          <p className="mx-auto mt-4 max-w-md" style={{ color: "#6B7280" }}>
            We're here to help. Reach out and we'll get back to you fast.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="btn-primary w-full sm:w-auto font-semibold text-sm uppercase tracking-wider"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:ops@velosys.io"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-lg px-7 text-sm font-semibold transition-colors"
              style={{ color: "#1F2937", border: "2px solid #E5E7EB" }}
            >
              Email ops@velosys.io
            </a>
          </div>
        </div>
      </section>
    </>
  );
}