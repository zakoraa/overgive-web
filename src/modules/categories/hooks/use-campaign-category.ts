import { CampaignCategory } from "@/core/types/campaign-category";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsByCategory } from "../services/get-campaigns-by-category";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";

export const useCampaignCategory = (
  category: CampaignCategory,
  search?: string
) => {
  const stableSearch = search ?? "";

  return useQuery<CampaignHomeItem[], Error>({
    queryKey: ["campaigns", category, stableSearch],
    queryFn: () =>
      getCampaignsByCategory({ category, search: stableSearch }),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
