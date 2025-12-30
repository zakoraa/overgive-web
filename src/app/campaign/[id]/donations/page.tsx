import { CampaignDonationsPage } from "@/modules/campaign/pages/campaign-donations-page";

interface CampaignDonationsPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignDonationsPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <CampaignDonationsPage campaignId={id} />;
}
