import { Donate } from "@/modules/donate";
import { getCampaignDetails } from "@/modules/campaign/services/get-campaign-details";
import { notFound } from "next/navigation";

interface DonatePageProps {
  params: { id: string };
}

export default async function Page({ params }: DonatePageProps) {
  const { id } = await params;

  const campaign = await getCampaignDetails(id);
  if (!campaign) return notFound();

  return <Donate campaign={campaign} />;
}
