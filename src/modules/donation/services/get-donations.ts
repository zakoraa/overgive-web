"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { Donation } from "../types/donation";
import { DonationWithBlockchain } from "./get-donation-by-id";

interface GetDonationOptions {
  user_id?: string;
  campaign_id?: string;
}

export async function getDonations(options: GetDonationOptions): Promise<DonationWithBlockchain[]> {
  const url = new URL(await absoluteUrl("/api/donation"));

  if (options.user_id) url.searchParams.append("user_id", options.user_id);
  if (options.campaign_id) url.searchParams.append("campaign_id", options.campaign_id);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.error ?? "Gagal mengambil donasi");
  }

  return result.data;
}


// "use server"

// import { absoluteUrl } from "@/core/lib/absolute-url";
// import { DonationIPFS } from "@/core/types/donation-ipfs";

//  type GetDonationsResult =
//   | {
//       success: true;
//       data: DonationIPFS[];
//     }
//   | {
//       success: false;
//       error: string;
//     };


// export async function getDonationsAction(
//   id: string,
//   by: "campaignId"| "userId",
// ): Promise<GetDonationsResult> {
//   try {
//     const url = by === "campaignId"?  await absoluteUrl(
//       `/api/donation/by-campaign/${id}`
//     ): await absoluteUrl(
//       `/api/donation/by-user/${id}`
//     );

//     const res = await fetch(url, { cache: "no-store" });
//     const json = await res.json();

//     if (!res.ok) {
//       return {
//         success: false,
//         error: json.error ?? "Gagal mengambil data donasi",
//       };
//     }

//     return {
//       success: true,
//       data: json.data,
//     };
//   } catch (e: any) {
//     return {
//       success: false,
//       error: e.message ?? "Terjadi Kesalahan",
//     };
//   }
// }
