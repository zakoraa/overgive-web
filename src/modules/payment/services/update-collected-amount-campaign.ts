"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function updateCollectedAmountAction(
  campaignId: string,
  amount: number
) {
  const url = await absoluteUrl(
    "/api/campaign/update-collected-amount"
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      campaign_id: campaignId,
      amount,
    }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Gagal update campaign");
  }

  return data;
}
