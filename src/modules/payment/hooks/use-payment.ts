"use client";

import { useEffect, useState } from "react";
import { getPayment } from "../services/get-payment";
import { PaymentRequest } from "../types/payment";

export function usePayment(paymentRequestId: string) {
  const [payment, setPayment] = useState<PaymentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentRequestId) return;

    let interval: NodeJS.Timeout;

    const fetchPayment = async () => {
      try {
        const data = await getPayment(paymentRequestId);
        setPayment(data);
        console.log("PAYMENT SIMULATION DATA: ", data)

        // stop polling kalau sudah final
        if (
          ["SUCCEEDED", "FAILED", "EXPIRED", "CANCELED"].includes(data.status)
        ) {
          clearInterval(interval);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();

    interval = setInterval(fetchPayment, 5000); // ⏱ polling 5 detik

    return () => clearInterval(interval);
  }, [paymentRequestId]);

  return { payment, loading, error };
}
