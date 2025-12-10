// app/campaign/[id]/page.tsx
import { Campaign } from "@/modules/campaign";
import { getCampaignDetails } from "@/modules/campaign/services/get-campaign-details";
import { notFound } from "next/navigation";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const campaign = await getCampaignDetails(id);

  if (!campaign) return notFound();

  return <Campaign initialCampaign={campaign} />;
}

