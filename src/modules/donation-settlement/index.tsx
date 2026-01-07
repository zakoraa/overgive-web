"use client";

import { DonationSettlement } from "./components/donation-settlement";
import { useGetDonationSettlementSummaryByCampaign } from "./hooks/use-get-donation-settlements-by-campaign";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import BasePage from "@/core/layout/base-page";

interface Props {
  campaignId: string;
}

export const DonationSettlementPage = ({ campaignId }: Props) => {
  const {
    data: summary,
    isLoading,
    isError,
  } = useGetDonationSettlementSummaryByCampaign(campaignId);

  if (isLoading) {
    return <ModalLoading isOpen />;
  }

  if (isError || !summary) {
    return (
      <BasePage className="mx-auto rounded-b-2xl p-4 md:max-w-lg">
        <p className="text-center text-xs text-gray-500">Belum ada data</p>
      </BasePage>
    );
  }

  return <DonationSettlement summary={summary} />;
};
