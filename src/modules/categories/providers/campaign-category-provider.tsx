"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsByCategory } from "../services/get-campaigns-by-category";
import { CampaignCategory } from "@/core/types/campaign-category";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";

interface CampaignCategoryContextValue {
  campaigns: CampaignHomeItem[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const CampaignCategoryContext =
  createContext<CampaignCategoryContextValue | null>(null);

export function CampaignCategoryProvider({
  category,
  search,
  children,
}: {
  category: CampaignCategory;
  search?: string;
  children: ReactNode;
}) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["campaigns_by_category", category, search],
    queryFn: () => getCampaignsByCategory({ category, search }),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
    enabled: !!category,
  });

  return (
    <CampaignCategoryContext.Provider
      value={{
        campaigns: data ?? [],
        loading: isLoading,
        error: isError ? (error as Error).message : null,
        refetch,
      }}
    >
      {children}
    </CampaignCategoryContext.Provider>
  );
}

export function useCampaignCategory() {
  const ctx = useContext(CampaignCategoryContext);
  if (!ctx) {
    throw new Error(
      "useCampaignCategory harus digunakan dalam CampaignCategoryProvider",
    );
  }
  return ctx;
}
