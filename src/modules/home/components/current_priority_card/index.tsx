"use client";

import { Card } from "@/core/components/ui/card";
import { CampaignHorizontalCard } from "../../../../core/components/donation_campaign_card/campaign-horizontal-card";
import { Label } from "@/core/components/text/label";
import { useCampaignHome } from "../../hooks/use-campaign-home";
import CircularLoading from "@/core/components/ui/circular-loading";

export const CurrentPriorityCard = () => {
  const { campaigns, loading, error } = useCampaignHome("priority", 3);

  return (
    <Card className="w-full px-5 py-6 md:px-10">
      <Card className="to-primary from-primary-dark w-fit! rounded-lg border-none bg-linear-to-tr px-3 py-1">
        <Label
          size="md"
          text="Prioritas Saat Ini"
          className="text-background font-bold"
        />
      </Card>

      <div className="mt-4 space-y-3">
        {loading && <CircularLoading />}
        {error && <p className="py-4 text-center text-red-500">{error}</p>}
        {!loading && !error && campaigns.length === 0 && (
          <p className="py-4 text-center">
            Tidak ada campaign prioritas saat ini
          </p>
        )}
        {!loading &&
          !error &&
          campaigns.map((campaign) => (
            <CampaignHorizontalCard key={campaign.id} campaign={campaign} />
          ))}
      </div>
    </Card>
  );
};
