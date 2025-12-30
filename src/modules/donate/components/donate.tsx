import BasePage from "@/core/layout/base-page";
import { Campaign } from "@/core/types/campaign";
import { CampaignDetailProvider } from "@/modules/campaign/providers/campaign-detail-provider";
import { DonateForm } from "./donate-form";

interface DonateProps {
  campaign: Campaign;
}

export const Donate = ({ campaign }: DonateProps) => {
  return (
    <BasePage className="border-none bg-transparent">
      <CampaignDetailProvider initialCampaign={campaign}>
        <DonateForm campaignId={campaign.id} />
      </CampaignDetailProvider>
    </BasePage>
  );
};
