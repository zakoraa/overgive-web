"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const percentage = Math.min(
    Math.round((campaign.collected_amount / campaign.target_amount) * 100),
    100,
  );

  return (
    <Card
      onClick={() => router.push(`/campaign/${campaign.id}`)}
      className="hover:bg-hover mt-3 flex h-[95%] max-w-52 cursor-pointer flex-col justify-between transition-colors duration-300"
    >
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
      <p className="text-end text-[11px] mx-3 mb-3">
        Target Donasi{" "}
        <span className="font-black">
          {formatRupiah(campaign.target_amount)}
        </span>
      </p>
    </Card>
  );
};
