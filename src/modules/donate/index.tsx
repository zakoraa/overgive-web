import BasePage from "@/core/layout/base-page";
import { DonateForm } from "./components/donate-form";
import { Campaign } from "@/core/types/campaign";
import { CampaignDetailProvider } from "@/modules/campaign/providers/campaign-detail-provider";

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
