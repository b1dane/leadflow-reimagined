import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, MessageSquare, Calendar, CheckCircle, ArrowRight, Activity } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How It Works — VeloSys | AI Lead Response in 3 Steps" },
      {
        name: "description",
        content:
          "Connect your number. AI responds instantly. Booked appointments show up. See how VeloSys works in 3 simple steps.",
      },
      { property: "og:title", content: "How It Works — VeloSys" },
      {
        property: "og:description",
        content: "Connect your number. AI responds instantly. Booked appointments show up.",
      },
    ],
  }),
});

const STEPS = [
  {
    number: "1",
    icon: Phone,
    title: "Connect your phone number",
    desc: "You keep your existing number. We route your calls and texts through VeloSys. Nothing to install — just a quick setup on our end.",
    details: [
      "Use your existing phone number",
      "No hardware to install",
      "Takes about 5 minutes",
      "Works with any carrier",
    ],
  },
  {
    number: "2",
    icon: MessageSquare,
    title: "AI responds to every lead instantly",
    desc: "Every text, every call-in — answered in under 8 seconds. The AI introduces itself, asks what the customer needs, qualifies the lead, and books the appointment.",
    details: [
      "Responds in under 8 seconds",
      "Works 24/7, including holidays",
      "AI sounds like a real person",
      "Handles multiple leads at once",
    ],
  },
  {
    number: "3",
    icon: Calendar,
    title: "Booked appointments appear in your dashboard",
    desc: "When a job is booked, it shows up in your VeloSys dashboard and syncs to your calendar. You get a notification with all the details. Just show up and work.",
    details: [
      "Appointment shows in dashboard instantly",
      "Get notifications on your phone",
      "View full conversation history",
      "Hand off to your team when needed",
    ],
  },
];

function HowItWorksPage() {
  return (
    <>
      {/* HERO (dark) */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "rgba(29,78,216,0.1)", filter: "blur(120px)" }} />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // How it works
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ color: "#E5E7EB" }}>
            Three steps.
            <br />
            <span style={{ color: "#1D4ED8" }}>You start booking more jobs.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
            From setup to your first booked appointment in under 10 minutes.
            No training. No installation. Just results.
          </p>
        </div>
      </section>

      {/* STEPS (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-4xl px-6 pb-20 md:pb-28">
          <div className="relative space-y-16 md:space-y-24">
            {STEPS.map(({ number, icon: Icon, title, desc, details }, i) => (
              <div key={number} className="relative">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-8 top-20 hidden h-24 w-px md:block" style={{ background: "linear-gradient(to bottom, #1D4ED8, transparent)" }} />
                )}

                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                  {/* Step number + icon */}
                  <div className="flex shrink-0 flex-col items-center md:w-24">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-cta">
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                    </div>
                    <span className="mt-2 text-sm font-bold" style={{ color: "#1D4ED8" }}>
                      Step {number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold md:text-3xl" style={{ color: "#1F2937" }}>
                      {title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed" style={{ color: "#6B7280" }}>
                      {desc}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {details.map((d) => (
                        <li key={d} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#059669" }} />
                          <span className="text-sm" style={{ color: "#1F2937" }}>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU SEE (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#F8FAFC" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
              // Your view
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
              What you see when a lead comes in
            </h2>
            <p className="mt-4" style={{ color: "#6B7280" }}>
              Your dashboard shows every lead, every conversation, and every booking in real time.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-2xl">
            <div className="card-light rounded-2xl p-6 md:p-8">
              {/* Mock dashboard */}
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#1F2937" }}>
                    Dashboard
                  </span>
                </div>
                <span className="text-[10px]" style={{ color: "#6B7280" }}>
                  Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {/* Lead card */}
                <div className="rounded-lg p-4 border" style={{ borderColor: "rgba(5,150,105,0.3)", backgroundColor: "rgba(5,150,105,0.04)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(5,150,105,0.2)" }}>
                        <CheckCircle className="h-4 w-4" style={{ color: "#059669" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>New lead</p>
                        <p className="text-[10px]" style={{ color: "#6B7280" }}>Just now</p>
                      </div>
                    </div>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "rgba(5,150,105,0.1)", color: "#059669" }}>
                      AI responded
                    </span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "#1F2937" }}>
                    Sarah M. — AC repair — Need someone today
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                    AI: &ldquo;Hi Sarah, we can get someone out today. What's your address?&rdquo;
                  </p>
                </div>

                {/* Booked card */}
                <div className="rounded-lg p-4 border" style={{ borderColor: "rgba(29,78,216,0.3)", backgroundColor: "rgba(29,78,216,0.04)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(29,78,216,0.2)" }}>
                        <Calendar className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>Booked</p>
                        <p className="text-[10px]" style={{ color: "#6B7280" }}>2 min ago</p>
                      </div>
                    </div>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "rgba(29,78,216,0.1)", color: "#1D4ED8" }}>
                      Appt. set
                    </span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "#1F2937" }}>
                    Mike R. — Water heater — Tomorrow 10 AM-12 PM
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                    ​$450 estimate · Houston, TX · Call before arrival
                  </p>
                </div>

                {/* Qualified card */}
                <div className="rounded-lg p-4 card-light">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(29,78,216,0.2)" }}>
                        <MessageSquare className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>Qualified</p>
                        <p className="text-[10px]" style={{ color: "#6B7280" }}>15 min ago</p>
                      </div>
                    </div>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "rgba(29,78,216,0.1)", color: "#1D4ED8" }}>
                      Needs quote
                    </span>
                  </div>
                  <p className="mt-2 text-sm" style={{ color: "#1F2937" }}>
                    James K. — Roof repair — 1,800 sq ft, 3 leaks
                  </p>
                  <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>
                    AI gathered details · Ready for you to call back
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl" style={{ color: "#1F2937" }}>
            Ready to never miss a lead again?
          </h2>
          <p className="mx-auto mt-4 max-w-md" style={{ color: "#6B7280" }}>
            Get started in 5 minutes. No credit card required.
          </p>
          <div className="mt-8">
            <Link
              to="/pricing"
              className="btn-primary w-full sm:w-auto font-semibold text-sm uppercase tracking-wider"
            >
              Get more leads
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}