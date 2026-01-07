import { Card } from "@/core/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";
import { useGetDonationsContext } from "@/modules/donation/providers/get-donations-provider";
import CircularLoading from "@/core/components/ui/circular-loading";

interface CampaignDetailsOfFundCardProps {
  campaignId: string;
}

export const CampaignDetailsOfFundCard = ({
  campaignId,
}: CampaignDetailsOfFundCardProps) => {
  const { donations, loading } = useGetDonationsContext();

  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard
        count={0}
        isShowAll={donations.length !== 0}
        href={`${campaignId}/donation-settlement`}
        title="Penggunaan Dana"
      />
      {loading ? (
        <CircularLoading />
      ) : (
        (!donations || donations.length === 0) && (
          <p className="text-center text-xs text-gray-500">
            Belum ada data
          </p>
        )
      )}
    </Card>
  );
};
