"use client";

import { Card } from "@/components/ui/card";
import { CampaignTitleCard } from "./ui/campaign-title-card";

export const CampaignLatestNewsCard = () => {
  return (
    <Card className="space-y-2 px-5 py-5">
      <CampaignTitleCard count={1} onClick={() => {}} title="Kabar Terbaru" />
      <p className="text-sm">Terakhir update — 12 November 2025</p>
    </Card>
  );
};
