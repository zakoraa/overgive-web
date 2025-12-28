"use client";

import { useEffect, useRef, useState } from "react";
import { PaymentRequest } from "@/modules/payment/types/payment";
import { updateCollectedAmountAction } from "../services/update-collected-amount-campaign";
import { createDonationAction } from "../services/create-donation";

interface UseCreateDonationResult {
  processing: boolean;
  error: string | null;
  success: boolean;
  donationId?: string;
}

export function useCreateDonation(
  payment?: PaymentRequest | null
): UseCreateDonationResult {
  const hasProcessedRef = useRef(false);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [donationId, setDonationId] = useState<string | undefined>();

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== "SUCCEEDED") return;
    if (hasProcessedRef.current) return;

    hasProcessedRef.current = true;

    const run = async () => {
      try {
        setProcessing(true);

        const donationData = {
          user_id: payment.metadata.user_id,
          username: payment.metadata.username,
          user_email: payment.metadata.email,
          is_anonymous: payment.metadata.is_anonymous,
          campaign_id: payment.metadata.campaign_id,
          amount: Number(payment.request_amount),
          currency: payment.currency,
          xendit_reference_id: payment.reference_id,
          donation_message: payment.metadata.message,
        };

        const result = await createDonationAction(donationData);
        setDonationId(result.data.id);

        const updateResult = await updateCollectedAmountAction(
          donationData.campaign_id,
          donationData.amount
        );

        if (!updateResult.success) {
          throw new Error(updateResult.error);
        }

        setSuccess(true);
      } catch (e: any) {
        setError(e.message ?? "Gagal memproses donasi");
      } finally {
        setProcessing(false);
      }
    };

    run();
  }, [payment]);

  return {
    processing,
    error,
    success,
    donationId,
  };
}
