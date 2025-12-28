"use client";

import { useQuery } from "@tanstack/react-query";
import { getLatestDonationSettlementMetaByCampaign } from "../services/get-latest-donation-settlement-by-campaign";

export const useGetLatestDonationSettlementMetaByCampaign = (campaignId: string) => {
  const query = useQuery({
    queryKey: ["latest_donation_settlement_meta", campaignId],
    queryFn: () => getLatestDonationSettlementMetaByCampaign(campaignId),
    enabled: !!campaignId,
  });

  return query;
};
