import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyTenants } from "@/lib/tenants";
import { useAuth } from "@/hooks/use-auth";

export type Tenant = {
  id: string;
  name: string;
  slug: string | null;
  industry: string;
  brand_voice: string | null;
  logo_url: string | null;
  primary_color: string | null;
  timezone: string | null;
  status: string;
  owner_user_id: string;
  created_at: string;
  updated_at: string;
};

type TenantCtx = {
  tenants: Tenant[];
  activeTenant: Tenant | null;
  setActiveTenantId: (id: string) => void;
  loading: boolean;
  refetch: () => void;
};

const Ctx = createContext<TenantCtx>({
  tenants: [],
  activeTenant: null,
  setActiveTenantId: () => {},
  loading: true,
  refetch: () => {},
});

const STORAGE_KEY = "velosys_active_tenant";

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const fetchTenants = useServerFn(listMyTenants);
  const [activeId, setActiveId] = useState<string | null>(null);

  const {
    data: tenants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tenants"],
    queryFn: () => fetchTenants(),
    enabled: !!user && !authLoading,
  });

  // Restore last selected tenant from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setActiveId(saved);
  }, []);

  // Auto-select first tenant if none selected
  useEffect(() => {
    if (tenants.length === 0) return;
    if (activeId && tenants.some((t) => t.id === activeId)) return;
    setActiveId(tenants[0].id);
  }, [tenants, activeId]);

  const setActiveTenantId = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, id);
    }
  };

  const activeTenant =
    tenants.find((t) => t.id === activeId) ?? tenants[0] ?? null;

  return (
    <Ctx.Provider
      value={{
        tenants,
        activeTenant,
        setActiveTenantId,
        loading: authLoading || isLoading,
        refetch: () => {
          void refetch();
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTenant = () => useContext(Ctx);
