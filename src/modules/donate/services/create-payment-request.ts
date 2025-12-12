"use server";
import { absoluteUrl } from "@/core/lib/absolute-url";
import { CreateQrisPayload } from "../types/create-payment-request";

export async function createPaymentRequestAction(
  payload: CreateQrisPayload
) {
  const url = await absoluteUrl("/api/xendit/create-payment-request");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.error ?? data.message ?? "Gagal membuat pembayaran",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
