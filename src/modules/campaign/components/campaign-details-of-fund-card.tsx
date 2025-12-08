"use client";

import { Card } from "@/core/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";

export const CampaignDetailsOfFundCard = () => {
  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard count={2} onClick={() => {}} title="Penggunaan Dana" />
      <p className="text-sm">Terakhir update — 10 November 2025</p>
    </Card>
  );
};
