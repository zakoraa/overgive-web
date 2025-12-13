"use client";

import { useState } from "react";
import { simulatePayment, SimulatePaymentResponse } from "../services/simulate-payment";

export function useSimulatePayment() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SimulatePaymentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (paymentRequestId: string, amount?: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await simulatePayment(paymentRequestId, amount);
      setData(res);

      return res;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    run,
    loading,
    data,
    error,
  };
}
