"use client";

import CircularLoading from "@/core/components/ui/circular-loading";
import BasePage from "@/core/layout/base-page";
import { useGetDonationsContext } from "@/modules/donation/providers/get-donations-provider";
import { DonorDonationCard } from "./campaign_donors_card/donor-donation-card";
import { Campaign as CampaignType } from "@/core/types/campaign";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";

interface CampaignProps {
  initialCampaign: CampaignType;
}

export const CampaignDonations = ({ initialCampaign }: CampaignProps) => {
  const { donations, loading, error } = useGetDonationsContext();

  return (
    <BasePage className="rounded-b-2xl px-4 py-3">
      <Title text={`Daftar Donasi Kampanye ${initialCampaign.title}`} />
      <Line />
      {loading && <CircularLoading />}
      {!loading && !error && donations.length === 0 && (
        <p className="text-center text-xs text-gray-500"> Belum ada donasi</p>
      )}
      {!loading &&
        !error &&
        donations.map((donation, index) => (
          <DonorDonationCard key={index} donation={donation} />
        ))}
    </BasePage>
  );
};
