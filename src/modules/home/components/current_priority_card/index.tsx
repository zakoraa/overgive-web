import { Card } from "@/components/ui/card";
import { CampaignHorizontalCard } from "../../../../components/donation_campaign_card/campaign-horizontal-card";
import { Label } from "@/components/text/label";

export const CurrentPriorityCard = () => {
  return (
    <Card className="w-full px-10 py-6">
      <Card className="to-primary from-primary-dark w-fit rounded-lg border-none bg-linear-to-tr px-3 py-1">
        <Label
          size="md"
          text="Prioritas Saat Ini"
          className="text-background font-bold"
        />
      </Card>

      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <CampaignHorizontalCard key={i} />
        ))}
      </div>
    </Card>
  );
};
