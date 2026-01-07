import { Card } from "@/core/components/ui/card";
import { DonorDonationCard } from "./donor-donation-card";
import { CampaignTitleCard } from "../ui/campaign-title-card";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useGetDonationsContext } from "@/modules/donation/providers/get-donations-provider";
import { useCampaignDetailContext } from "../../providers/campaign-detail-provider";

export const CampaignDonorsCard = () => {
  const { donations, loading, error } = useGetDonationsContext();
  const { campaign } = useCampaignDetailContext();

  const topDonations = donations.slice(0, 3);

  return (
    <Card className="space-y-2 px-5 py-5 pb-20">
      <CampaignTitleCard
        count={donations.length}
        title="Donatur"
        isShowAll={donations.length !== 0}
        href={`/campaign/${campaign?.id}/donations`}
      />
      {loading && <CircularLoading />}
      {!loading && !error && donations.length === 0 && (
        <p className="text-center text-xs text-gray-500"> Belum ada donasi</p>
      )}
      {!loading &&
        !error &&
        topDonations.map((donation, index) => (
          <DonorDonationCard key={index} donation={donation} />
        ))}
    </Card>
  );
};
