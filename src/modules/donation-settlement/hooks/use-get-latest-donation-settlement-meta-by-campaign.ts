"use client";

import { useQuery } from "@tanstack/react-query";
import { getLatestDonationSettlementMetaByCampaign } from "../services/get-latest-donation-settlement-by-campaign";

export const useGetLatestDonationSettlementMetaByCampaign = (
  campaignId?: string,
) => {
  return useQuery({
    queryKey: ["latest_donation_settlement_meta", campaignId],
    queryFn: () => getLatestDonationSettlementMetaByCampaign(campaignId!),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,        
    gcTime: 10 * 60 * 1000,          
    refetchOnWindowFocus: false,     
    retry: 1,                        
  });
};
