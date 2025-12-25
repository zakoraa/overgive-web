import { CampaignDonations } from "@/modules/campaign/pages/campaign-donations";
import { getCampaignDetails } from "@/modules/campaign/services/get-campaign-details";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";
import { notFound } from "next/navigation";

interface CampaignDonationsPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignDonationsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const campaign = await getCampaignDetails(id);

  if (!campaign) return notFound();

  return (
    <GetDonationsProvider campaign_id={campaign.id}>
      <CampaignDonations initialCampaign={campaign} />
    </GetDonationsProvider>
  );
}
