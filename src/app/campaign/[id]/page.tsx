// app/campaign/[id]/page.tsx
import { Campaign } from "@/modules/campaign";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <Campaign campaignId={id} />;
}
