import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Menu, X, Zap, ChevronDown, ArrowRight, MessageSquare, Calendar, BarChart3, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/hooks/use-auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold" style={{ color: "#E5E7EB" }}>404</h1>
        <h2 className="mt-4 text-xl font-semibold" style={{ color: "#E5E7EB" }}>Page not found</h2>
        <p className="mt-2 text-sm" style={{ color: "#9CA3AF" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg btn-primary px-4 py-2 text-sm font-medium"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ backgroundColor: "#000000" }}>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: "#E5E7EB" }}>
          This page didn't load
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#9CA3AF" }}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg btn-primary px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border-2"
            style={{ color: "#E5E7EB", borderColor: "rgba(255,255,255,0.2)" }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VeloSys — Lead Response for Contractors" },
      { name: "description", content: "Tool that texts your leads back instantly. Qualifies them, books appointments, and never misses a call." },
      { name: "author", content: "VeloSys" },
      { property: "og:title", content: "VeloSys — Lead Response for Contractors" },
      { property: "og:description", content: "Tool that texts your leads back instantly. Never miss a customer again." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@VeloSys" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-cta">
            <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-widest" style={{ color: "#E5E7EB" }}>
            VELOSYS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" style={{ color: "#9CA3AF" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors ${
                  isActive ? "" : "hover:"
                }`}
                style={{ color: isActive ? "#E5E7EB" : "#9CA3AF" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+183****0199"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "#9CA3AF" }}
          >
            <Phone className="h-4 w-4" />
            (832) 555-0199
          </a>
          <Link
            to="/login"
            className="hidden md:inline-flex items-center justify-center rounded-lg px-4 h-14 text-sm font-semibold transition-colors"
            style={{ color: "#E5E7EB", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            Sign in
          </Link>
          <a
            href={location.pathname === "/" ? "#get-started" : "/pricing"}
            className="hidden md:inline-flex items-center gap-2 btn-primary w-auto font-semibold text-sm uppercase tracking-wider"
          >
            Get more leads
          </a>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" style={{ color: "#E5E7EB" }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: "#E5E7EB" }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t md:hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}>
          <div className="space-y-1 px-6 py-4">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-4 py-3 text-sm font-medium transition-colors"
                  style={{
                    color: isActive ? "#E5E7EB" : "#9CA3AF",
                    backgroundColor: isActive ? "rgba(255,255,255,0.04)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <hr className="my-2" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md px-4 py-3 text-sm font-medium"
              style={{ color: "#9CA3AF" }}
            >
              Sign in
            </Link>
            <a
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg gradient-cta px-4 py-3 text-center text-sm font-semibold text-white w-full"
            >
              Get more leads
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-black/80" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md gradient-cta">
                <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-widest" style={{ color: "#E5E7EB" }}>
                VELOSYS
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              Tool that texts your leads back instantly. Qualifies them.
              Books appointments. You just show up and work.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#1D4ED8" }}>Pages</h4>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors"
                    style={{ color: "#9CA3AF" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#1D4ED8" }}>Contact</h4>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: "#9CA3AF" }}>
              <li>
                <a href="tel:+183****0199" className="flex items-center gap-2 transition-colors font-semibold" style={{ color: "#E5E7EB" }}>
                  <Phone className="h-4 w-4" style={{ color: "#1D4ED8" }} />
                  (832) 555-0199
                </a>
              </li>
              <li>
                <a href="mailto:ops@velosys.io" className="transition-colors" style={{ color: "#9CA3AF" }}>
                  ops@velosys.io
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[11px] uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
            © 2026 · VeloSys
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(156,163,175,0.6)" }}>
            Built for contractors. By people who build things.
          </p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen">
          <Nav />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}