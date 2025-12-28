"use client";

import { useEffect, useRef } from "react";
import { createDonationSettlementAction } from "../services/create-donation-settlement";
import { PaymentRequest } from "@/modules/payment/types/payment";

export function useProcessDonationSettlement(
  payment: PaymentRequest | null,
  donationId?: string
) {
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== "SUCCEEDED") return;
    if (!donationId) return;
    if (hasProcessedRef.current) return;

    hasProcessedRef.current = true;

    const run = async () => {
      try {
        await createDonationSettlementAction({
          donation_id: donationId,
        });
      } catch (e) {
        console.error("Gagal membuat settlement", e);
      }
    };

    run();
  }, [payment, donationId]);
}
