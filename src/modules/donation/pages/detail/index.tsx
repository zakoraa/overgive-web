"use client";

import { notFound } from "next/navigation";
import { useDonationById } from "../../hooks/use-donation-by-id";
import { DonationDetail } from "./donation-detail";
import { ModalLoading } from "@/core/components/modal/modal-loading";

export const DonationDetailPage = ({ donationId }: { donationId: string }) => {
  const { data, isLoading, isError } = useDonationById(donationId);

  if (isLoading) {
    return <ModalLoading isOpen />;
  }

  if (isError || !data) {
    notFound();
  }

  return <DonationDetail donation={data} />;
};
