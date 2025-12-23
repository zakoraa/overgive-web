import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const res = await fetch(
    `https://api.xendit.co/v3/payment_requests/${id}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.XENDIT_API_KEY! + ":"
        ).toString("base64")}`,
        "api-version": "2024-11-11",
      },
    }
  );

  const raw = await res.text();
  if (!res.ok) {
    return NextResponse.json({ error: raw }, { status: res.status });
  }

  const payment = JSON.parse(raw);

  // console.log("GET PAYMENT: ", payment)

  return NextResponse.json(payment);
  // if (payment.status !== "SUCCEEDED") {
  //   return NextResponse.json(payment);
  // }

  // // 🔐 hash payload payment
  // const hashItem = crypto
  //   .createHash("sha256")
  //   .update(JSON.stringify(payment))
  //   .digest("hex");

      // // simpan ke DB
  // await saveDonationToDB({
  //   ...payment,
  //   hashItem
  // });

  // ⛓️ simpan ke blockchain
  // const txResult = await saveDonationToBlockchain(
  //   payment.reference_id,                 // donationId
  //   payment.campaign_id ?? "unknown",     // campaignId
  //   payment.payment_request_id,           // paymentRef
  //   Number(payment.request_amount),       // amount
  //   payment.currency,                     // currency
  //   hashItem,                             // donationHash
  //   Math.floor(new Date(payment.updated).getTime() / 1000)
  // );

  // return NextResponse.json({
  //   success: true,
  //   tx: txResult,
  // });
}
