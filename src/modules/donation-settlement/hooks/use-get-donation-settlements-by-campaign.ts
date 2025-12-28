"use client";

import { useQuery } from "@tanstack/react-query";

import {  getDonationSettlementSummaryByCampaign } from "../services/get-donation-settlement-summary-by-campaign";

export const useGetDonationSettlementSummaryByCampaign = (campaignId: string) => {
  const query = useQuery({
    queryKey: ["donation_settlements", campaignId],
    queryFn: () => getDonationSettlementSummaryByCampaign(campaignId),
    enabled: !!campaignId,
  });

  return query; 
};

