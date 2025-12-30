"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignHome } from "../services/get-campaign-home";
import { CampaignHomeItem } from "../types/campaign-home-item";
import { CampaignListType } from "../services/get-campaign-home";

export function useCampaignHome(type: CampaignListType, limit?: number) {
  const query = useQuery<CampaignHomeItem[]>({
    queryKey: ["campaign_home", type, limit],
    queryFn: () => getCampaignHome({ type, limit }),
    enabled: !!type,

    staleTime: 2 * 60 * 1000,     
    gcTime: 5 * 60 * 1000,        
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    campaigns: query.data ?? [],
    loading: query.isLoading,
    fetching: query.isFetching,
    error: query.error
      ? (query.error as Error).message
      : null,
    refetch: query.refetch,
  };
}
