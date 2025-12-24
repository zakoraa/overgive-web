import { NextResponse } from "next/server";

interface PinataRow {
  ipfs_pin_hash: string;
  date_pinned: string;
  size: number;
  metadata?: {
    keyvalues?: Record<string, any>;
  };
}

export async function GET(
  _req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = await params;

  const url = new URL("https://api.pinata.cloud/data/pinList");

  url.searchParams.set("status", "pinned");
  url.searchParams.set(
    "metadata",
    JSON.stringify({
      keyvalues: {
        campaign_id: {
          value: userId,
          op: "eq",
        },
      },
    })
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: await res.text() },
      { status: res.status }
    );
  }

  const data = await res.json();

  // 🔽 ambil isi JSON tiap CID
  const donations = await Promise.all(
    (data.rows as PinataRow[]).map(async (row) => {
      const gatewayUrl = `https://gateway.pinata.cloud/ipfs/${row.ipfs_pin_hash}`;

      const jsonRes = await fetch(gatewayUrl, { cache: "no-store" });
      const jsonData = await jsonRes.json();

      return {
        cid: row.ipfs_pin_hash,
        pinnedAt: row.date_pinned,
        size: row.size,
        data: jsonData, // ⬅️ INI ISI JSON DONASINYA
      };
    })
  );
  
  console.log("DONATIONS: ", donations)

  return NextResponse.json({
    success: true,
    data: donations,
  });
}
