"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
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
  const search = searchParams.get("q") ?? "";

  const { data, isLoading, isError, error } = useQuery<CampaignHomeItem[]>({
    queryKey: ["search-campaigns", search],
    queryFn: () => searchCampaigns({ search }),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <SearchCampaignContext.Provider
      value={{
        campaigns: data ?? [],
        loading: isLoading,
        error: isError ? (error as Error).message : null,
      }}
    >
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
