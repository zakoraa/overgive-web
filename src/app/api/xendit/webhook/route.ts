import { NextRequest, NextResponse } from "next/server";
import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { saveDonationToBlockchain } from "@/modules/donation/services/save-donation-to-blockchain";
import { increaseCollectedAmount } from "@/modules/payment/services/update-collected-amount-campaign";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("x-callback-token");
    if (token !== process.env.XENDIT_CALLBACK_TOKEN) {
      return NextResponse.json(
        { error: "Invalid webhook token" },
        { status: 401 }
      );
    }

    const payload = await req.json();

    const data = payload.data;
    if (!data) {
      return NextResponse.json({ received: true });
    }

    if (data.status !== "SUCCEEDED") {
      return NextResponse.json({ received: true });
    }

    const {
      reference_id,
      request_amount,
      currency,
      metadata,
    } = data;

    if (!metadata?.campaign_id || !request_amount) {
      return NextResponse.json(
        { error: "Payload tidak valid" },
        { status: 400 }
      );
    }

    const supabase = await supabaseServer();

    const { data: existing } = await supabase
      .from("donations")
      .select("id")
      .eq("xendit_reference_id", reference_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true });
    }

    const donationPayload = {
      user_id: metadata.user_id,
      username: metadata.username,
      user_email: metadata.email,
      is_anonymous: metadata.is_anonymous,
      campaign_id: metadata.campaign_id,
      amount: Number(request_amount),
      currency: currency ?? "IDR",
      xendit_reference_id: reference_id,
      donation_message: metadata.message,
    };

    const donation_hash = generateDonationHash(donationPayload);

    let blockchain_tx_hash: string | null = null;

    try {
      const blockchainResult = await saveDonationToBlockchain(
        reference_id,
        metadata.campaign_id,
        reference_id,
        Number(request_amount),
        currency ?? "IDR",
        donation_hash,
        Math.floor(Date.now() / 1000)
      );

      blockchain_tx_hash = blockchainResult?.txHash ?? null;
    } catch (e: any) {
      console.error("Blockchain error (non-fatal):", e);
    }


    const { error: insertError } = await supabase
      .from("donations")
      .insert([
        {
          user_id: metadata.user_id ?? null,
          username: metadata.username ?? null,
          user_email: metadata.email ?? null,
          is_anonymous: metadata.is_anonymous ?? false,
          campaign_id: metadata.campaign_id,
          amount: Number(request_amount),
          currency: currency ?? "IDR",
          xendit_reference_id: reference_id,
          donation_message: metadata.message ?? null,
          donation_hash,
          blockchain_tx_hash,
        },
      ]);

    if (insertError) {
      throw insertError;
    }

     await increaseCollectedAmount(
      supabase,
      metadata.campaign_id,
      Number(request_amount)
    );

    return NextResponse.json({
      success: true,
      blockchain_tx_hash,
    });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

