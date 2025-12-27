"use client";

import { Card } from "@/core/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";
import { useRouter } from "next/navigation";
import { Campaign } from "@/core/types/campaign";

interface CampaignLatestNewsCardProps {
  campaign: Campaign;
}

export const CampaignLatestNewsCard = ({
  campaign,
}: CampaignLatestNewsCardProps) => {
  const router = useRouter();
  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard
        count={1}
        onClick={() => router.push(`${campaign.id}/delivery-history`)}
        title="Kabar Terbaru"
      />
      <p className="text-sm">Terakhir update — 12 November 2025</p>
    </Card>
  );
};
