import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Building2, Sparkles } from "lucide-react";
import { createTenant } from "@/lib/tenants";
import { useTenant } from "@/hooks/use-tenant";

const INDUSTRIES = [
  { value: "general", label: "General / Other" },
  { value: "hvac", label: "HVAC" },
  { value: "fence", label: "Fence / Outdoor Living" },
  { value: "roofing", label: "Roofing" },
  { value: "plumbing", label: "Plumbing" },
  { value: "electrical", label: "Electrical" },
  { value: "solar", label: "Solar" },
  { value: "landscaping", label: "Landscaping / Tree Service" },
  { value: "other", label: "Other service business" },
] as const;

export function Onboarding({ onComplete }: { onComplete?: () => void }) {
  const create = useServerFn(createTenant);
  const { refetch, setActiveTenantId } = useTenant();

  const [name, setName] = useState("");
  const [industry, setIndustry] = useState<string>("general");
  const [brandVoice, setBrandVoice] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mut = useMutation({
    mutationFn: (payload: {
      name: string;
      industry: string;
      brand_voice?: string;
    }) => create({ data: payload as never }),
    onSuccess: (tenant) => {
      refetch();
      if (tenant?.id) setActiveTenantId(tenant.id);
      onComplete?.();
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : "Could not create business");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Business name is required");
      return;
    }
    mut.mutate({
      name: name.trim(),
      industry,
      brand_voice: brandVoice.trim() || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
            <Sparkles className="h-6 w-6" strokeWidth={2} />
          </div>
          <h1 className="mt-5 font-display text-3xl tracking-tight">
            Set up your business
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            This takes under a minute. You can change everything later.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-card"
        >
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              Business name *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Lone Star Fence Co."
                className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              Industry
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {INDUSTRIES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-muted-foreground">
              We’ll load a ready-made follow-up sequence for this industry.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              Brand voice (optional)
            </label>
            <input
              value={brandVoice}
              onChange={(e) => setBrandVoice(e.target.value)}
              placeholder="e.g. friendly, direct, professional"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={mut.isPending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-95 disabled:opacity-60 transition"
          >
            {mut.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating…
              </>
            ) : (
              "Create business & continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
