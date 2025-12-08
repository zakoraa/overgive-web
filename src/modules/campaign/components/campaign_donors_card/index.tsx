"use client";

import { Card } from "@/core/components/ui/card";
import { DonorDonationCard } from "./donor-donation-card";
import { CampaignTitleCard } from "../ui/campaign-title-card";

export const CampaignDonorsCard = () => {
  return (
    <Card className="space-y-2 px-5 py-5 pb-20">
      <CampaignTitleCard count={1000} title="Donatur" onClick={() => {}} />

      {[0, 1, 2].map((item, index) => (
        <DonorDonationCard key={index} />
      ))}
    </Card>
  );
};
