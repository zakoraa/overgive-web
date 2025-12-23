"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { PaymentRequest } from "@/modules/payment/types/payment";

interface SaveDonationToBlockchainPayload {
  payment: PaymentRequest;
}

interface SaveDonationToBlockchainResponse {
  success: boolean;
  txHash?: string;
  blockNumber?: number;
  gasUsed?: string;
  error?: string;
}

export async function saveDonationToBlockchainAction(
  payload: SaveDonationToBlockchainPayload
): Promise<SaveDonationToBlockchainResponse> {
  const url = await absoluteUrl("/api/payment/save-to-blockchain");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data?.error ?? "Gagal menyimpan ke blockchain",
      };
    }

    return {
      success: true,
      txHash: data.txHash,
      blockNumber: data.blockNumber,
      gasUsed: data.gasUsed,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message,
    };
  }
}
