import { SearchCampaign } from "@/modules/search_campaigns";
import { SearchCampaignProvider } from "@/modules/search_campaigns/providers/search-campaign-provider";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <SearchCampaignProvider search={searchParams.q}>
      <SearchCampaign />
    </SearchCampaignProvider>
  );
}
