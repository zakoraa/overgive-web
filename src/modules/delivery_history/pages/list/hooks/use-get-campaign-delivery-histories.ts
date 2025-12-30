"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCampaignDeliveryHistories } from "../services/get-campaign-delivery-histories-by-campaign-id";
import { CampaignDeliveryHistoryList } from "../types/campaign-delivery-history";

export function useCampaignDeliveryHistories(campaign_id: string) {
  const [search, setSearch] = useState("");

  const query = useQuery<CampaignDeliveryHistoryList[]>({
    queryKey: ["campaign_delivery_histories", campaign_id, search],
    queryFn: () =>
      getCampaignDeliveryHistories({
        campaign_id,
        search,
      }),
    enabled: !!campaign_id,
    
    staleTime: 2 * 60 * 1000,      
    gcTime: 5 * 60 * 1000,         
    placeholderData: (prev) => prev,       
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    data: query.data ?? [],
    loading: query.isLoading,
    fetching: query.isFetching, 
    error: query.error ? (query.error as Error).message : null,

    search,
    setSearch,

    refresh: query.refetch,
  };
}
