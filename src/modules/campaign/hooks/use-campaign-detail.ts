import { useQuery } from "@tanstack/react-query";
import { getCampaignDetails } from "../services/get-campaign-details";
import { Campaign } from "@/core/types/campaign";

export const useCampaignDetail = (id: string) => {
  return useQuery<Campaign | null>({
    queryKey: ["campaign", id],        
    queryFn: () => getCampaignDetails(id),
    enabled: !!id,                     
  });
};
