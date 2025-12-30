"use client";

import { useQuery } from "@tanstack/react-query";
import { getDonations } from "../services/get-donations";
import { Donation } from "../types/donation";

interface UseDonationsOptions {
  user_id?: string;
  campaign_id?: string;
}

export function useDonations({ user_id, campaign_id }: UseDonationsOptions) {
  const query = useQuery<Donation[]>({
    queryKey: ["donations", { user_id, campaign_id }],
    queryFn: () => getDonations({ user_id, campaign_id }),
    enabled: !!user_id || !!campaign_id,
    staleTime: 60 * 1000,
  });

  return {
    data: query.data ?? [],
    loading: query.isLoading,
    fetching: query.isFetching,
    error: query.error,
  };
}
