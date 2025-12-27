"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";
import { CampaignDeliveryHistoryList } from "../types/campaign-delivery-history";
import { useCampaignDeliveryHistories } from "../hooks/use-get-campaign-delivery-histories";

interface ContextValue {
  data: CampaignDeliveryHistoryList[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  refresh: () => void;
}

const CampaignDeliveryHistoriesContext =
  createContext<ContextValue | null>(null);

export function CampaignDeliveryHistoriesProvider({
  campaignId,
  children,
}: {
  campaignId: string;
  children: ReactNode;
}) {
  const value = useCampaignDeliveryHistories(campaignId);

  return (
    <CampaignDeliveryHistoriesContext.Provider
      value={value}
    >
      {children}
    </CampaignDeliveryHistoriesContext.Provider>
  );
}

export function useCampaignDeliveryHistoriesContext() {
  const ctx = useContext(
    CampaignDeliveryHistoriesContext
  );

  if (!ctx) {
    throw new Error(
      "useCampaignDeliveryHistoriesContext harus dipakai di dalam Provider"
    );
  }

  return ctx;
}
