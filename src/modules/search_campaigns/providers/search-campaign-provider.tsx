"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";
import { searchCampaigns } from "../services/search-campaigns";

interface SearchCampaignContextValue {
  campaigns: CampaignHomeItem[];
  loading: boolean;
  error: string | null;
}

const SearchCampaignContext = createContext<SearchCampaignContextValue | null>(
  null,
);

export function SearchCampaignProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? undefined;

  const [campaigns, setCampaigns] = useState<CampaignHomeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchCampaigns({ search });
        setCampaigns(data);
      } catch (err: any) {
        setError(err.message || "Gagal mencari campaign");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [search]); // ✅ sekarang benar-benar reactive

  return (
    <SearchCampaignContext.Provider value={{ campaigns, loading, error }}>
      {children}
    </SearchCampaignContext.Provider>
  );
}

export function useSearchCampaign() {
  const ctx = useContext(SearchCampaignContext);
  if (!ctx) {
    throw new Error(
      "useSearchCampaign harus digunakan di dalam SearchCampaignProvider",
    );
  }
  return ctx;
}
