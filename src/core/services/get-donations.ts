"use server"

import { absoluteUrl } from "@/core/lib/absolute-url";
import { DonationIPFS } from "@/core/types/donation-ipfs";

 type GetDonationsResult =
  | {
      success: true;
      data: DonationIPFS[];
    }
  | {
      success: false;
      error: string;
    };


export async function getDonationsAction(
  id: string,
  by: "campaignId"| "userId",
): Promise<GetDonationsResult> {
  try {
    const url = by === "campaignId"?  await absoluteUrl(
      `/api/donation/by-campaign/${id}`
    ): await absoluteUrl(
      `/api/donation/by-user/${id}`
    );

    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.error ?? "Gagal mengambil data donasi",
      };
    }

    return {
      success: true,
      data: json.data,
    };
  } catch (e: any) {
    return {
      success: false,
      error: e.message ?? "Terjadi Kesalahan",
    };
  }
}
