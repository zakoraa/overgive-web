import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { saveDonationToBlockchain } from "@/modules/donation/services/save-donation-to-blockchain";
import { NextResponse } from "next/server";

interface CreateDonationRequest {
  user_id?: string;
  username?: string;
  user_email?: string;
  is_anonymous?: boolean;
  campaign_id: string;
  amount: number;
  currency?: string;
  xendit_reference_id?: string;
  donation_message?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateDonationRequest;

    if (!body.campaign_id || !body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: "campaign_id dan amount wajib diisi dan > 0" },
        { status: 400 }
      );
    }

    // 1️⃣ generate donation hash
    const donation_hash = generateDonationHash(body);

    // 2️⃣ simpan ke blockchain
    const blockchainResult = await saveDonationToBlockchain(
      body.xendit_reference_id ?? "unknown",
      body.campaign_id,
      body.xendit_reference_id ?? "unknown",
      body.amount,
      body.currency ?? "IDR",
      donation_hash,
      Math.floor(Date.now() / 1000)
    );

    const blockchain_tx_hash = blockchainResult.txHash ?? null;

    // 3️⃣ simpan ke supabase
    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("donations")
      .insert([
        {
          user_id: body.user_id ?? null,
          username: body.username ?? null,
          user_email: body.user_email ?? null,
          is_anonymous: body.is_anonymous ?? false,
          campaign_id: body.campaign_id,
          amount: body.amount,
          currency: body.currency ?? "IDR",
          xendit_reference_id: body.xendit_reference_id ?? null,
          donation_message: body.donation_message ?? null,
          donation_hash,
          blockchain_tx_hash,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      blockchain_tx_hash,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
