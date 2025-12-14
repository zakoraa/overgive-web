import { NextResponse } from "next/server";
import crypto from "crypto";
import { saveDonationToBlockchain } from "@/core/services/save-donation-to-blockchain";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  
  const res = await fetch(`https://api.xendit.co/v3/payment_requests/${id}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.XENDIT_API_KEY! + ":").toString("base64")}`,
      "api-version": "2024-11-11",
    },
  });

  const raw = await res.text();
  if (!res.ok) return NextResponse.json({ error: raw }, { status: res.status });

  const payment = JSON.parse(raw);

  // if (payment.status !== "SUCCEEDED") {
    return NextResponse.json( payment );
  // }

  // generate hash
  const hashItem = crypto.createHash("sha256").update(JSON.stringify(payment)).digest("hex");

  // // simpan ke DB
  // await saveDonationToDB({
  //   ...payment,
  //   hashItem
  // });

  // kirim hash ke blockchain
    // generate hash
  // kirim ke blockchain, jangan lupa campaignId dari payment (misal payment.campaign_id)
  // const txHash = await saveDonationToBlockchain(
  //   payment.reference_id,        // donationId
  //   payment.campaign_id,         // campaignId
  //   payment.payment_request_id,  // paymentRef
  //   payment.request_amount,      // amount
  //   payment.currency,            // currency
  //   hashItem,                    // donationHash
  //   Math.floor(new Date(payment.updated).getTime() / 1000) // confirmedAt
  // );

  // return NextResponse.json({ payment, hashItem, txHash });
}
