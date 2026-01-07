"use client";

import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { DonationProgressIndicator } from "@/core/components/ui/donation-progress-indicator";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";
import { formatRupiah } from "@/core/utils/currency";

interface CampaignVerticalCardProps {
  campaign: CampaignHomeItem;
}

export const CampaignVerticalCard = ({
  campaign,
}: CampaignVerticalCardProps) => {

  const percentage = Math.min(
    Math.round((campaign.collected_amount / campaign.target_amount) * 100),
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
      className="hover:bg-hover relative mt-3 flex h-[95%] max-w-52 cursor-pointer flex-col justify-between transition-colors duration-300"
    >
      {/* Label sisa hari */}
      {campaign.ended_at !== null && (
        <div className="bg-primary/90 absolute top-2 left-2 z-10 rounded-md px-2 py-1 text-[11px] font-bold text-white shadow-md">
          {remainingDays} hari lagi
        </div>
      )}
      <div>
        <img
          src={campaign.image_url}
          height={60}
          width={250}
          alt={campaign.title}
          className="h-32 min-w-full rounded-t-2xl object-cover"
        />
        <div className="m-3 flex flex-col justify-between space-y-2">
          <Label
            size="md"
            className="text-start font-bold"
            text={campaign.title}
          />
          <div className="space-y-1">
            <p className="text-[12px]">
              Terkumpul{" "}
              <span className="text-primary font-black">
                {formatRupiah(campaign.collected_amount)}
              </span>
            </p>
            <DonationProgressIndicator percentage={percentage} />
          </div>
        </div>
      </div>
      {campaign.target_amount !== null && (
        <p className="mx-3 mb-3 text-end text-[11px]">
          Target Donasi{" "}
          <span className="font-black">
            {formatRupiah(campaign.target_amount)}
          </span>
        </p>
      )}
    </Card>
  );
};
