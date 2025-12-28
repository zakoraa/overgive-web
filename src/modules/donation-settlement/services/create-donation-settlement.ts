"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { CreateDonationSettlementRequest } from "../types/create-donation-settlement";

export async function createDonationSettlementAction(
  data: CreateDonationSettlementRequest
) {
  const url = await absoluteUrl("/api/donation-settlement/create");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.error ?? "Gagal menyimpan settlement donasi"
    );
  }

  return result;
}
