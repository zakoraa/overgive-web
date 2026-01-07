import { Card } from "@/core/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";
import { Campaign } from "@/core/types/campaign";
import { useCampaignDeliveryHistorySummary } from "../hooks/use-campaign-delivery-history-summary";
import CircularLoading from "@/core/components/ui/circular-loading";
import { formatDate } from "@/core/utils/date";

interface CampaignLatestNewsCardProps {
  campaign: Campaign;
}

export const CampaignLatestNewsCard = ({
  campaign,
}: CampaignLatestNewsCardProps) => {
  const { data, isLoading: loading } = useCampaignDeliveryHistorySummary(
    campaign.id,
  );
  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard
        isShowAll={data?.count !== 0}
        count={loading ? 0 : (data?.count ?? 0)}
        href={`${campaign.id}/delivery-history`}
        title="Kabar Terbaru"
      />
      {loading ? (
        <CircularLoading />
      ) : !data?.latest_created_at ? (
        <p className="text-center text-xs text-gray-500">
          Belum ada kabar terbaru
        </p>
      ) : (
        <p className="text-sm">
          Terakhir update — {formatDate(data?.latest_created_at)}
        </p>
      )}
    </Card>
  );
};
