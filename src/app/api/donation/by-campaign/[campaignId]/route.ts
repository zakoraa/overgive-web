import { DonationIPFS } from "@/modules/donation/types/donation-ipfs";
import { NextRequest, NextResponse } from "next/server";

interface PinataRow {
  ipfs_pin_hash: string;
  date_pinned: string;
  size: number;
  data: DonationIPFS;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ campaignId: string }> }
) {
  const { campaignId } =await params;

  const url = new URL("https://api.pinata.cloud/data/pinList");
  url.searchParams.set("status", "pinned");
 url.searchParams.set(
    "metadata",
    JSON.stringify({
      keyvalues: {
        campaign_id: campaignId
      }
    })
  );


  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { success: false, error: text },
      { status: res.status }
    );
  }

  const data = await res.json();

  const filteredRows = (data.rows as any[]).filter(
  (row) => row.metadata?.keyvalues?.campaign_id === campaignId
);

  // 🔑 ambil isi JSON dari IPFS
  const donations = await Promise.all(
    (filteredRows as PinataRow[]).map(async (row) => {
      const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${row.ipfs_pin_hash}`;

      const jsonRes = await fetch(gatewayUrl, { cache: "no-store" });
      const jsonData = await jsonRes.json();

      return jsonData as DonationIPFS
    })
  );

  donations.forEach((d, i) => {
});

  return NextResponse.json({
    success: true,
    data: donations,
  });
}
