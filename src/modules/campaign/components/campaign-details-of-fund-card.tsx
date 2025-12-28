"use client";

import { Card } from "@/core/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";
import { formatDate } from "@/core/utils/date";
import { useGetLatestDonationSettlementMetaByCampaign } from "@/modules/donation-settlement/hooks/use-get-latest-donation-settlement-meta-by-campaign";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useRouter } from "next/navigation";

interface CampaignDetailsOfFundCardProps {
  campaignId: string;
}

export const CampaignDetailsOfFundCard = ({
  campaignId,
}: CampaignDetailsOfFundCardProps) => {
  const router = useRouter();
  const {
    data: latestMeta,
    isLoading,
    error,
  } = useGetLatestDonationSettlementMetaByCampaign(campaignId);

  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard count={0} onClick={() => router.push(`${campaignId}/donation-settlement`)} title="Penggunaan Dana" />
      {isLoading && <CircularLoading />}
      {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
      {!isLoading && !error && !latestMeta && (
        <p className="text-xs text-gray-500 text-center">Belum ada data terbaru</p>
      )}
      {!isLoading && !error && latestMeta && (
        <p className="text-sm">
          Terakhir update — {formatDate(latestMeta.updated_at)}
        </p>
      )}
    </Card>
  );
};
