"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function getDonationByReferenceAction(referenceId: string) {
  const url = await absoluteUrl(
    `/api/donation/by-reference/${referenceId}`
  );

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error ?? "Gagal mengambil data donasi");
  }

  return result;
}
