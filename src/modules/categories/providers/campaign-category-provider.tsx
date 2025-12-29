"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getCampaignsByCategory } from "../services/get-campaigns-by-category";
import { CampaignCategory } from "@/core/types/campaign-category";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";

interface CampaignCategoryContextValue {
  campaigns: CampaignHomeItem[];
  loading: boolean;
  error: string | null;
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
  const [campaigns, setCampaigns] = useState<CampaignHomeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCampaignsByCategory({ category, search });
        setCampaigns(data);
      } catch (err: any) {
        // console.error(err);
        setError(err.message || "Gagal mengambil campaign");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [category, search]);

  return (
    <CampaignCategoryContext.Provider value={{ campaigns, loading, error }}>
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
