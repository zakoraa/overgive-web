"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignDeliveryHistorySummary } from "../services/get-campaign-delivery-history-summary";
import { CampaignDeliveryHistorySummary } from "../types/get-delivery-history-summary";

export function useCampaignDeliveryHistorySummary(campaign_id: string) {
  return useQuery<CampaignDeliveryHistorySummary | null>({
    queryKey: ["campaign-delivery-history-summary", campaign_id],
    queryFn: () => getCampaignDeliveryHistorySummary({ campaign_id }),
    enabled: !!campaign_id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
