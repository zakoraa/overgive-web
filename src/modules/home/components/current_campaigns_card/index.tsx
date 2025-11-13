"use client";
import { Card } from "@/components/ui/card";
import { Title } from "@/components/text/title";
import { CurrentCampaignList } from "./current-campaign-list";

export const CurrentCampaignsCard = () => {

  return (
    <Card className="relative w-full py-4">
      <Title size="sm" text="Terbaru" className="mx-8" />
      <CurrentCampaignList />
    </Card>
  );
};
