import { CampaignDonations } from "@/modules/campaign/components/campaign-donations";
import { CampaignDonationsPage } from "@/modules/campaign/pages/campaign-donations-page";
import { getCampaignDetails } from "@/modules/campaign/services/get-campaign-details";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";
import { notFound } from "next/navigation";

interface CampaignDonationsPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignDonationsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <CampaignDonationsPage campaignId={id} />;
}
