import BasePage from "@/layout/base-page";
import { CampaignBackgroundCard } from "./components/campaign-background-card";
import { CampaignHeaderCard } from "./components/campaign-header-card";
import { CampaignDonorsCard } from "./components/campaign_donors_card";
import { CampaignLatestNewsCard } from "./components/campaign-latest-news-card";
import { CampaignDetailsOfFundCard } from "./components/campaign-details-of-fund-card";
import { DonationButton } from "./components/ui/donation-button";

export const Campaign = () => {
  return (
    <BasePage className="border-none bg-transparent">
      <CampaignHeaderCard />
      <CampaignBackgroundCard />
      <CampaignLatestNewsCard />
      <CampaignDetailsOfFundCard />
      <CampaignDonorsCard />
      <DonationButton />
    </BasePage>
  );
};
