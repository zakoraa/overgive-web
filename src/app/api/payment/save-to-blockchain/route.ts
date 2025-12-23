import { NextResponse } from "next/server";
import crypto from "crypto";
import { saveDonationToBlockchain } from "@/core/services/save-donation-to-blockchain";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      payment,
    } = body;

    if (payment.status !== "SUCCEEDED") {
      return NextResponse.json(
        { error: "Payment not succeeded" },
        { status: 400 }
      );
    }

    const paymentRequestId = payment.payment_request_id;

    // 🔐 hash payment
    const hashItem = crypto
      .createHash("sha256")
      .update(JSON.stringify(payment))
      .digest("hex");

    // ⛓️ blockchain
    const txResult =  await saveDonationToBlockchain(
      payment.reference_id,
      payment.campaign_id ?? "unknown",
      paymentRequestId,
      Number(payment.request_amount),
      payment.currency,
      hashItem,
      Math.floor(new Date(payment.updated).getTime() / 1000)
    );

    console.log("TX RESULT BRO: ", txResult)

    return NextResponse.json({
      success: true,
      txHash: txResult.txHash,
      blockNumber: txResult.blockNumber,
      gasUsed: txResult.gasUsed,
    });
  } catch (e: any) {
    console.log("ERROR SAVE DONATION TO BC: ", e)
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
