"use client";

import { useEffect, useRef, useState } from "react";
import { createDonationSettlementAction } from "../services/create-donation-settlement";
import { PaymentRequest } from "@/modules/payment/types/payment";

export function useProcessDonationSettlement(
  payment: PaymentRequest | null,
  donationId?: string
) {
  const hasProcessedRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== "SUCCEEDED") return;
    if (!donationId) return;
    if (hasProcessedRef.current) return;

    hasProcessedRef.current = true;

    const run = async () => {
      setLoading(true);
      try {
        await createDonationSettlementAction({ donation_id: donationId });
        setSuccess(true); // tandai berhasil
      } catch (e: any) {
        // console.error("Gagal membuat settlement", e);
        setError(e?.message || "Terjadi kesalahan saat settlement");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [payment, donationId]);

  return { loading, success, error };
}
