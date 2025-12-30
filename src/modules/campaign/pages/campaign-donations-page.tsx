"use client";

import { notFound } from "next/navigation";
import { useCampaignDetails } from "@/modules/campaign/hooks/use-campaign-detail";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";
import { CampaignDonations } from "../components/campaign-donations";
import { ModalLoading } from "@/core/components/modal/modal-loading";

interface Props {
  campaignId: string;
}

export const CampaignDonationsPage = ({ campaignId }: Props) => {
  const { campaign, loading, isError } = useCampaignDetails(campaignId);

  if (loading) {
    return <ModalLoading isOpen />;
  }

  if (isError || !campaign) {
    return notFound();
  }

  return (
    <GetDonationsProvider campaign_id={campaign.id}>
      <CampaignDonations initialCampaign={campaign} />
    </GetDonationsProvider>
  );
};
