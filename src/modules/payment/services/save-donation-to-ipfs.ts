"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { PaymentRequest } from "@/modules/payment/types/payment";

interface SaveDonationToIPFSPayload {
  payment: PaymentRequest;
  blockchainTxHash: string;
}

interface SaveDonationToIPFSResponse {
  success: boolean;
  cid?: string;
  url?: string;
  error?: string;
}

export async function saveDonationToIPFSAction(
  payload: SaveDonationToIPFSPayload
): Promise<SaveDonationToIPFSResponse> {
  const url = await absoluteUrl("/api/payment/save-to-ipfs");

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
        error: data?.error ?? "Gagal menyimpan ke IPFS",
      };
    }

    return {
      success: true,
      cid: data.cid,
      url: data.url,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message ?? "Server error",
    };
  }
}
