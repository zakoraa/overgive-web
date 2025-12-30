import { CampaignCategory } from "@/core/types/campaign-category";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsByCategory } from "../services/get-campaigns-by-category";

export const useCampaignCategory = (
  category: CampaignCategory,
  search?: string
) => {
  return useQuery({
    queryKey: ["campaigns", category, search],
    queryFn: () => getCampaignsByCategory({ category, search }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
  });
};
