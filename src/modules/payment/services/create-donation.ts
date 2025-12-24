"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { CreateDonationRequest } from "../types/create-donation-request";

export async function createDonationAction(data: CreateDonationRequest) {
  const url = await absoluteUrl("/api/donation/create");

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
    throw new Error(result.error ?? "Gagal menyimpan donasi");
  }

  return result;
}
