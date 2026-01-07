"use client";

import { useQuery } from "@tanstack/react-query";
import { getDonationSettlementSummaryByCampaign } from "../services/get-donation-settlement-summary-by-campaign";

export const useGetDonationSettlementSummaryByCampaign = (
  campaignId?: string
) => {
  return useQuery({
    queryKey: ["donation_settlement_summary", campaignId],
    queryFn: () => getDonationSettlementSummaryByCampaign(campaignId!),
    enabled: !!campaignId,

    staleTime: 0,                 // selalu dianggap stale
    refetchOnWindowFocus: true,   // refetch saat tab difokuskan
    refetchOnMount: "always",     // refetch saat page dibuka
    retry: 1,
  });
};
