import { PaymentRequest } from "../types/payment";

export async function getPayment(paymentRequestId: string): Promise<PaymentRequest> {
  const res = await fetch(`/api/payment/${paymentRequestId}`, { cache: "no-store" });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal mengambil status pembayaran");
  }

  return res.json();
}