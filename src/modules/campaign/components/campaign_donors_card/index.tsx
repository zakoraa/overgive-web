"use client";

import { Card } from "@/core/components/ui/card";
import { DonorDonationCard } from "./donor-donation-card";
import { CampaignTitleCard } from "../ui/campaign-title-card";
import { useDonationsContext } from "@/core/providers/get-donations-provider";
import CircularLoading from "@/core/components/ui/circular-loading";

export const CampaignDonorsCard = () => {
  const { donations, loading, error } = useDonationsContext();

  return (
    <Card className="space-y-2 px-5 py-5 pb-20">
      <CampaignTitleCard
        count={donations.length}
        title="Donatur"
        onClick={() => {}}
      />
      {loading && <CircularLoading />}
      {!loading && !error && donations.length === 0 && (
        <p className="text-center text-xs text-gray-500"> Belum ada donasi</p>
      )}
      {!loading &&
        !error &&
        donations.map((donation, index) => (
          <DonorDonationCard key={index} donation={donation} />
        ))}
    </Card>
  );
};
