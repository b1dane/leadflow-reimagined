import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — VeloSys | Get in Touch" },
      {
        name: "description",
        content:
          "Get in touch with the VeloSys team. Email us at ops@velosys.io, call, or fill out the contact form.",
      },
      { property: "og:title", content: "Contact — VeloSys" },
      {
        property: "og:description",
        content: "Get in touch with the VeloSys team.",
      },
    ],
  }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("VeloSys inquiry");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:ops@velosys.io?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      {/* HERO (dark) */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16" style={{ backgroundColor: "#000000" }}>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full" style={{ background: "rgba(29,78,216,0.1)", filter: "blur(120px)" }} />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1D4ED8" }}>
            // Contact
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" style={{ color: "#E5E7EB" }}>
            Get in touch.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
            Have a question? Want to get started? Our team is here to help.
          </p>
        </div>
      </section>

      {/* CONTACT (light) */}
      <section className="border-t" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
        <div className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1F2937" }}>
                How to reach us
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                The fastest way to get a response is email. We typically reply within
                a few hours during business hours.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ border: "1px solid rgba(29,78,216,0.4)", backgroundColor: "rgba(29,78,216,0.1)", color: "#1D4ED8" }}>
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>Email</p>
                    <a
                      href="mailto:ops@velosys.io"
                      className="mt-1 block text-sm transition-colors" style={{ color: "#1D4ED8" }}
                    >
                      ops@velosys.io
                    </a>
                    <p className="mt-1 text-xs" style={{ color: "#6B7280" }}>
                      We reply within a few hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ border: "1px solid rgba(29,78,216,0.4)", backgroundColor: "rgba(29,78,216,0.1)", color: "#1D4ED8" }}>
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1F2937" }}>Phone</p>
                    <a
                      href="tel:+183****0199"
                      className="mt-1 block text-sm font-semibold transition-colors" style={{ color: "#1F2937" }}
                    >
                      (832) 555-0199
                    </a>
                    <p className="mt-1 text-xs" style={{ color: "#6B7280" }}>
                      Leave a message and we'll call back.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-xl p-6 card-light">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#1D4ED8" }}>
                  Want to get started?
                </h3>
                <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                  Skip the contact form and go straight to pricing.
                </p>
                <Link
                  to="/pricing"
                  className="mt-4 inline-flex btn-primary w-auto font-semibold text-sm uppercase tracking-wider"
                >
                  See pricing
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <form onSubmit={handleSubmit} className="card-light rounded-xl p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between pb-4 border-b" style={{ borderColor: "#E5E7EB" }}>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#1F2937" }}>
                    Send us a message
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
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    placeholder="jane@company.com"
                    required
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="+1 555 010 0199"
                  />
                  <div>
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you need..."
                      required
                      rows={4}
                      className="w-full rounded-lg px-4 py-3 text-sm border resize-y min-h-[100px]"
                      style={{ color: "#1F2937", borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 btn-primary w-full font-semibold text-sm uppercase tracking-wider"
                >
                  {sent ? "✓ Message sent" : "Send message"}
                  <Send className="h-4 w-4" />
                </button>

                {sent && (
                  <p className="mt-4 text-center text-xs font-semibold" style={{ color: "#1D4ED8" }}>
                    Your email client should open. If not, send directly to ops@velosys.io
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
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