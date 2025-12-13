import { XenditPaymentWebhook } from "@/core/types/webhook";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const callbackToken = req.headers.get("x-callback-token");

  // 1️⃣ Verifikasi token webhook
  if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return NextResponse.json(
      { error: "Invalid webhook token" },
      { status: 401 }
    );
  }

  let payload: XenditPaymentWebhook;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const {
    event,
    data: {
      payment_request_id,
      payment_id,
      reference_id,
      status,
      request_amount,
      metadata,
    },
  } = payload;

  console.log("XENDIT WEBHOOK:", {
    event,
    payment_request_id,
    payment_id,
    status,
  });

  // 2️⃣ Handle status penting
  switch (status) {
    case "SUCCEEDED":
      // TODO: update database → payment sukses
      // contoh:
      // await db.payment.update({
      //   where: { paymentRequestId: payment_request_id },
      //   data: { status: "SUCCEEDED", paymentId: payment_id }
      // });
      break;

    case "FAILED":
    case "EXPIRED":
    case "CANCELED":
      // TODO: tandai payment gagal
      break;

    default:
      // PENDING / AUTHORIZED → abaikan
      break;
  }

  // 3️⃣ Wajib balas 200 supaya Xendit tidak retry
  return NextResponse.json({ received: true });
}
