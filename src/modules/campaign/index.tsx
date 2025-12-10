import BasePage from "@/core/layout/base-page";
import { CampaignBackgroundCard } from "./components/campaign-background-card";
import { CampaignHeaderCard } from "./components/campaign-header-card";
import { CampaignDonorsCard } from "./components/campaign_donors_card";
import { CampaignLatestNewsCard } from "./components/campaign-latest-news-card";
import { CampaignDetailsOfFundCard } from "./components/campaign-details-of-fund-card";
import { DonationButton } from "./components/ui/donation-button";
import { Campaign as CampaignType } from "@/core/types/campaign";
import { CampaignDetailProvider } from "./providers/campaign-detail-provider";

interface CampaignProps {
  initialCampaign: CampaignType;
}

export const Campaign = ({ initialCampaign }: CampaignProps) => {
  return (
    <BasePage className="border-none bg-transparent">
      <CampaignDetailProvider initialCampaign={initialCampaign}>
        <CampaignHeaderCard />
        <CampaignBackgroundCard />
        <CampaignLatestNewsCard />
        <CampaignDetailsOfFundCard />
        <CampaignDonorsCard />
        <DonationButton />
      </CampaignDetailProvider>
    </BasePage>
  );
};
