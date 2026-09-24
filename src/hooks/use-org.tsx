import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyOrganizations } from "@/lib/organizations";
import { useAuth } from "@/hooks/use-auth";

export type Organization = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

type OrgCtx = {
  orgs: Organization[];
  activeOrg: Organization | null;
  setActiveOrgId: (id: string) => void;
  loading: boolean;
  refetch: () => void;
};

const Ctx = createContext<OrgCtx>({
  orgs: [],
  activeOrg: null,
  setActiveOrgId: () => {},
  loading: true,
  refetch: () => {},
});

const STORAGE_KEY = "velosys_active_org";

export function OrgProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const fetchOrgs = useServerFn(listMyOrganizations);
  const [activeId, setActiveId] = useState<string | null>(null);

  const {
    data: orgs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orgs"],
    queryFn: () => fetchOrgs(),
    enabled: !!user && !authLoading,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setActiveId(saved);
  }, []);

  useEffect(() => {
    if (orgs.length === 0) return;
    if (activeId && orgs.some((o) => o.id === activeId)) return;
    setActiveId(orgs[0].id);
  }, [orgs, activeId]);

  const setActiveOrgId = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, id);
    }
  };

  const activeOrg = orgs.find((o) => o.id === activeId) ?? orgs[0] ?? null;

  return (
    <Ctx.Provider
      value={{
        orgs,
        activeOrg,
        setActiveOrgId,
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

export const useOrg = () => useContext(Ctx);
