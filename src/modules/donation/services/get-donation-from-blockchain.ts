"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export interface BlockchainTx {
  hash: string;
  from: string;
  to: string;
  input: string;
  value: string;
  blockNumber: number;
}

export async function getDonationFromBlockchainTxAction(txHash: string) {
  const url = await absoluteUrl(
    `/api/blockchain/tx?txHash=${txHash}`
  );

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Gagal ambil data blockchain");
  }

  return data.data as BlockchainTx;
}
