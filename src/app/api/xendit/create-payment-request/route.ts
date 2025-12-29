import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, metadata: CreateQrisMetadataPayload } = body;
    const { username, email, campaign_id, message, is_anonymous, user_id } = CreateQrisMetadataPayload;

    if (!amount) {
      return NextResponse.json(
        { error: "amount dan order_id wajib" },
        { status: 400 }
      );
    }

    const orderId = "donation_" + Date.now();

    const payload = {
      reference_id: orderId,
      type: "PAY",
      country: "ID",
      currency: "IDR",
      request_amount: amount,
      capture_method: "AUTOMATIC",
      channel_code: "QRIS",
      channel_properties: {
        qr_string_type: "DYNAMIC",
      },
      description: "QRIS Donation",
      metadata: {
        user_id,
        campaign_id, 
        order_id: orderId,
        username,
        email, 
        message, 
        is_anonymous: is_anonymous
      },
    };

    const res = await fetch(
      "https://api.xendit.co/v3/payment_requests",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.XENDIT_API_KEY! + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
          "api-version": "2024-11-11",
        },
        body: JSON.stringify(payload),
      }
    );

    const raw = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { error: raw },
        { status: res.status }
      );
    }

    return NextResponse.json(JSON.parse(raw));
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
