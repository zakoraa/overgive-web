import { useQuery } from "@tanstack/react-query";
import { getCampaignDetails } from "../services/get-campaign-details";
import { Campaign } from "@/core/types/campaign";

export const useCampaignDetails = (id: string) => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<Campaign | null>({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  });

  return {
    campaign: data,
    loading: isLoading,
    fetching: isFetching, 
    isError,
    error,
  };
};
