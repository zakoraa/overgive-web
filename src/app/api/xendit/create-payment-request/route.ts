import { NextResponse } from "next/server";
import { QrisService } from "@/core/lib/xendit/qris";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      amount,
      name,
      email,
      message,
      isAnonymous,
    } = body;

    console.log("body: ", body);

    // Validate input
    if (!amount) {
      return NextResponse.json(
        { message: "Amount required" },
        { status: 400 }
      );
    }

    // Generate order ID here
    const orderId = "donation_" + Date.now();
    const externalId = `qris-${orderId}`;

    const qris = await QrisService.createQris({
      amount,
      external_id: externalId,
      metadata: {
        order_id: orderId,
        donor_name: name,
        donor_email: email,
        donor_message: message,
        is_anonymous: isAnonymous,
      },
    });

    console.log("qris: ", qris);

    // Generate QR
    const qrImageUrl = await QRCode.toDataURL(qris.qr_string);

    return NextResponse.json({
      id: qris.id,
      orderId,
      externalId: qris.external_id,
      qrString: qris.qr_string,
      qrImageUrl,
      callbackUrl: qris.callback_url,
      status: qris.status,
      metadata: qris.metadata,
    });
  } catch (error: any) {
    console.log("ERROR: ", error);
    return NextResponse.json(
      { error: error.message ?? "Internal error" },
      { status: 500 }
    );
  }
}
