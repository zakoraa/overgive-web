import { Card } from "@/components/ui/card";
import { CampaignCard } from "../donation_campaigns_card/campaign_horizontal_card";
import { Label } from "@/components/text/label";

export const CurrentPriorityCard = () => {
  return (
    <Card className="w-full px-10 py-8">
      <Card className="bg-primary w-fit rounded-lg border-none px-3 py-1">
        <Label
          size="lg"
          text="Prioritas Saat Ini"
          className="text-background"
        />
      </Card>

      {[1, 2, 3].map((_) => (
        <CampaignCard />
      ))}
    </Card>
  );
};
