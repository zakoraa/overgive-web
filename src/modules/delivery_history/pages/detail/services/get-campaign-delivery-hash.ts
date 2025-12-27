import crypto from "crypto";

export function generateCampaignDeliveryHash(data: {
  campaign_id: string;
  title: string;
  note?: string | null;
  created_by: string;
}) {
  const hashString = [
    data.campaign_id,
    data.title,
    data.note ?? "",
    data.created_by,
  ].join("|");

  return crypto.createHash("sha256").update(hashString).digest("hex");
}
