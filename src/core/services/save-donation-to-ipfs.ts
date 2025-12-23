import { pinata } from "../lib/pinata/config";

export interface SaveToIPFSResult {
  cid: string;
  url: string;
}

export async function saveDonationToIPFS(
  payload: any,
  groupId?: string
): Promise<SaveToIPFSResult> {
  // 1️⃣ JSON → Blob
  const jsonString = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonString], {
    type: "application/json",
  });

  // 2️⃣ Nama file (immutable snapshot)
  const file = new File(
    [blob],
    `donation-${Date.now()}.json`,
    { type: "application/json" }
  );

  // 3️⃣ Upload ke IPFS (optional group)
  const { cid } = await pinata.upload.public.file(file, {
    ...(groupId ? { groupId } : {}),
  });

  // 4️⃣ Gateway URL
  const url = await pinata.gateways.public.convert(cid);

  return {
    cid,
    url,
  };
}
