"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export interface SimulatePaymentResponse {
  status: "PENDING";
  message: string;
}

export async function simulatePayment(
  paymentRequestId: string,
  amount?: number
): Promise<SimulatePaymentResponse> {
  const url = await absoluteUrl("/api/payment/simulate");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      payment_request_id: paymentRequestId,
      amount,
    }),
  });

  const raw = await res.text();

  if (!res.ok) {
    throw new Error(raw);
  }

  return JSON.parse(raw);
}
