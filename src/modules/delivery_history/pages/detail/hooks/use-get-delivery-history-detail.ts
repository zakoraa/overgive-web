"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignDeliveryHistoryById } from "../services/get-delivery-history-detail";
import { CampaignDeliveryHistoryDetail } from "../types/get-delivery-history-detail";

export function useCampaignDeliveryHistoryDetail(
  campaignDeliveryHistoryId?: string,
) {
  const query = useQuery<CampaignDeliveryHistoryDetail, Error>({
    queryKey: ["campaign-delivery-history-detail", campaignDeliveryHistoryId],
    queryFn: () =>
      getCampaignDeliveryHistoryById({
        campaign_delivery_history_id: campaignDeliveryHistoryId!,
      }),
    enabled: !!campaignDeliveryHistoryId, 
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error?.message ?? null,
    refresh: query.refetch,
  };
}
