import { pinata } from "../lib/pinata/config";

export interface SaveToIPFSResult {
  cid: string;
  url: string;
}

export async function saveDonationToIPFS(
  payload: any,
  groupId?: string
) {
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  const fileName =
    payload?.donation?.payment_request_id ?? Date.now();

  const file = new File(
    [blob],
    `donation-${fileName}.json`,
    { type: "application/json" }
  );

  // 1️⃣ Upload file
  const { cid } = await pinata.upload.public.file(file, {
    ...(groupId ? { groupId } : {}),
  });

  // 2️⃣ Update metadata (WAJIB langkah ini)
  await fetch("https://api.pinata.cloud/pinning/hashMetadata", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: JSON.stringify({
      ipfsPinHash: cid,
      name: `donation-${fileName}.json`,
      keyvalues: {
        campaign_id: payload.donation.campaign_id,
        user_id: payload.donor.user_id,
        reference_id: payload.donation.reference_id,
        payment_request_id: payload.donation.payment_request_id,
        status: payload.donation.status,
        is_anonymous: String(payload.donor.is_anonymous),
      },
    }),
  });

  const url = await pinata.gateways.public.convert(cid);

  return { cid, url };
}
