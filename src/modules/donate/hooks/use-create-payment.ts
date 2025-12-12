"use client";

import { useState } from "react";
import { createPaymentRequestAction } from "../services/create-payment-request";
import { CreateQrisPayload } from "../types/create-payment-request";

export function useCreatePayment() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const createPayment = async (payload: CreateQrisPayload) => {
    setLoading(true);
    setServerError(null);

    try {
      const res = await createPaymentRequestAction(payload);
      console.log("REs CRE: ", res)
      console.log("PAYLOAD: ", payload)
      setLoading(false);

      if (!res?.success) {
        setServerError(res?.error || "Gagal memproses pembayaran");
        console.log("ERROR CREATE: ", res.error)
        return { success: false };
      }

      return {
        success: true,
        data: res.data,
      };
    } catch (error: any) {
      setLoading(false);
      console.log("ERROR CREATE: ", error)
      setServerError(error?.message || "Terjadi kesalahan server");
      return { success: false };
    }
  };

  return { loading, serverError, createPayment };
}
