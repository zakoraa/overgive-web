import { NextResponse } from "next/server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const txHash = url.searchParams.get("txHash");

    if (!txHash) {
      return NextResponse.json(
        { error: "txHash wajib diisi" },
        { status: 400 }
      );
    }

    const tx = await getTxByHash(txHash);

    return NextResponse.json({
      success: true,
      data: tx,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message ?? "Gagal mengambil data blockchain" },
      { status: 500 }
    );
  }
}
