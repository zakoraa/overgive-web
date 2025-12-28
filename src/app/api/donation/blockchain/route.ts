// app/api/donation/blockchain/route.ts
import { NextResponse } from "next/server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const txHash = url.searchParams.get("tx_hash");

    if (!txHash) {
      return NextResponse.json(
        { error: "tx_hash wajib diisi" },
        { status: 400 }
      );
    }

    const input = await waitForTxInput(txHash);

    return NextResponse.json({
      success: true,
      data: {
        hash: txHash,
        input,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}

async function waitForTxInput(
  txHash: string,
  maxRetry = 10,
  delayMs = 2000
): Promise<string> {
  for (let i = 0; i < maxRetry; i++) {
    const tx = await getTxByHash(txHash);

    if (tx?.input && tx.input !== "0x") {
      return tx.input;
    }

    await new Promise((res) => setTimeout(res, delayMs));
  }

  throw new Error("Blockchain input belum tersedia");
}
