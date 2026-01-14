"use client";

import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { DonationProgressIndicator } from "@/core/components/ui/donation-progress-indicator";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";
import { formatRupiah } from "@/core/utils/currency";

interface CampaignHorizontalCardProps {
  campaign: CampaignHomeItem;
}

export const CampaignHorizontalCard = ({
  campaign,
}: CampaignHorizontalCardProps) => {
  const percentage =
    campaign.target_amount === null
      ? 50
      : Math.min(
          Math.round(
            (campaign.collected_amount / campaign.target_amount) * 100,
          ),
          100,
        );

  const now = new Date();
  const endedAt = new Date(campaign.ended_at);
  const diffTime = endedAt.getTime() - now.getTime();
  const remainingDays =
    diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

  return (
    <Card
      href={`/campaign/${campaign.id}`}
      className="hover:bg-hover relative flex h-fit min-w-full! cursor-pointer transition-colors duration-300"
    >
      {/* Label sisa hari */}
      {campaign.ended_at !== null && (
        <div className="bg-primary/90 absolute top-2 left-2 z-10 rounded-md px-2 py-1 text-[11px] font-bold text-white shadow-md">
          {remainingDays} hari lagi
        </div>
      )}

      <img
        src={campaign.image_url}
        height={100}
        width={200}
        alt={campaign.title}
        className="min-h-full w-[100px] rounded-s-2xl object-cover lg:w-[200px]"
      />
      <div className="m-3 flex w-full flex-col justify-between">
        <Label size="md" className="text-start" text={campaign.title} />
        <div className="space-y-1">
          <p className="text-xs">
            Terkumpul{" "}
            <span className="text-primary font-black">
              {formatRupiah(campaign.collected_amount)}
            </span>
          </p>
          <DonationProgressIndicator percentage={percentage} />
          {campaign.target_amount !== null && (
            <p className="mt-3 text-end text-xs">
              Target Donasi{" "}
              <span className="font-black">
                {formatRupiah(campaign.target_amount)}
              </span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
