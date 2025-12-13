import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { payment_request_id, amount } = await req.json();

    if (!payment_request_id) {
      return NextResponse.json(
        { error: "payment_request_id is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api.xendit.co/v3/payment_requests/${payment_request_id}/simulate`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            process.env.XENDIT_API_KEY! + ":"
          ).toString("base64")}`,
          "Content-Type": "application/json",
          "api-version": "2024-11-11",
        },
        body: JSON.stringify({
          amount, // boleh dikirim, boleh juga undefined
        }),
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
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}
