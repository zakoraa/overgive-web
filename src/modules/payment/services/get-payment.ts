// src/modules/payment/services/get-payment.ts

import { PaymentData } from "../types/payment";

export async function getPayment(orderId: string): Promise<PaymentData | null> {
  try {
    const res = await fetch(`/api/payment/${orderId}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    console.log("data get: ", data)
    return data as PaymentData;
  } catch (err) {
    console.error("Failed to fetch payment:", err);
    return null;
  }
}
