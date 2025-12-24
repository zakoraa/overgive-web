import crypto from "crypto";

export function generateDonationHash(data: {
  user_id?: string | null;
  username?: string | null;
  user_email?: string | null;
  campaign_id: string;
  amount: number;
  currency?: string;
  donation_message?: string | null;
  xendit_reference_id?: string | null;
}) {
  const hashString = [
    data.user_id ?? "",
    data.username ?? "",
    data.user_email ?? "",
    data.campaign_id,
    data.amount.toString(),
    data.currency ?? "IDR",
    data.donation_message ?? "",
    data.xendit_reference_id ?? "",
  ].join("|");

  return crypto.createHash("sha256").update(hashString).digest("hex");
}
