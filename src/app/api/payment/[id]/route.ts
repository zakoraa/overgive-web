import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
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
    return NextResponse.json(
      { error: raw },
      { status: res.status }
    );
  }

  return NextResponse.json(JSON.parse(raw));
}
