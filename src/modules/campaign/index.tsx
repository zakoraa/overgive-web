"use client";

import BasePage from "@/core/layout/base-page";
import { CampaignBackgroundCard } from "./components/campaign-background-card";
import { CampaignHeaderCard } from "./components/campaign-header-card";
import { CampaignDonorsCard } from "./components/campaign_donors_card";
import { CampaignLatestNewsCard } from "./components/campaign-latest-news-card";
import { CampaignDetailsOfFundCard } from "./components/campaign-details-of-fund-card";
import { DonationButton } from "./components/ui/donation-button";
import { CampaignDetailProvider } from "./providers/campaign-detail-provider";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";
import { useCampaignDetails } from "./hooks/use-campaign-detail";
import { ModalLoading } from "@/core/components/modal/modal-loading";

interface CampaignProps {
  campaignId: string;
}

export const Campaign = ({ campaignId }: CampaignProps) => {
  const { loading, campaign, isError } = useCampaignDetails(campaignId);

  return (
    <BasePage className="border-none bg-transparent">
      {loading && <ModalLoading isOpen />}
      {isError && (
        <p className="mx-auto text-center text-sm text-gray-500">
          {" "}
          Kampanye tidak ditemukan
        </p>
      )}
      {!loading && campaign && (
        <CampaignDetailProvider initialCampaign={campaign}>
          <CampaignHeaderCard />
          <CampaignBackgroundCard />
          <CampaignLatestNewsCard campaign={campaign} />
          <CampaignDetailsOfFundCard campaignId={campaign.id} />
          <GetDonationsProvider campaign_id={campaign.id}>
            <CampaignDonorsCard />
          </GetDonationsProvider>
          <DonationButton />
        </CampaignDetailProvider>
      )}
    </BasePage>
  );
};
