"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { Donation } from "../types/donation";

export interface DonationWithBlockchain extends Donation {
  blockchain: {
    hash: string;
    from: string;
    to: string;
    input: string;
    value: string;
    blockNumber: number;
  } | null;
}

interface GetDonationByIdResponse {
  success: boolean;
  data?: DonationWithBlockchain;
  error?: string;
}

export async function getDonationByIdAction(
  id: string
): Promise<GetDonationByIdResponse> {
  const url = await absoluteUrl(`/api/donation/${id}`);

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: data?.error ?? "Gagal mengambil detail donasi",
    };
  }

  return {
    success: true,
    data: data.data as DonationWithBlockchain,
  };
}
