"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCampaignDeliveryHistoryDetail } from "../hooks/use-get-delivery-history-detail";
import { CampaignDeliveryHistoryDetail } from "../types/get-delivery-history-detail";

interface ContextValue {
  data: CampaignDeliveryHistoryDetail | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const CampaignDeliveryHistoryDetailContext = createContext<ContextValue | null>(
  null,
);

export function CampaignDeliveryHistoryDetailProvider({
  deliveryHistoryId,
  children,
}: {
  deliveryHistoryId: string;
  children: ReactNode;
}) {
  const value = useCampaignDeliveryHistoryDetail(deliveryHistoryId);

  return (
    <CampaignDeliveryHistoryDetailContext.Provider value={value}>
      {children}
    </CampaignDeliveryHistoryDetailContext.Provider>
  );
}

export function useCampaignDeliveryHistoryDetailContext() {
  const ctx = useContext(CampaignDeliveryHistoryDetailContext);

  if (!ctx) {
    throw new Error(
      "useCampaignDeliveryHistoryDetailContext harus dipakai di dalam Provider",
    );
  }

  return ctx;
}
