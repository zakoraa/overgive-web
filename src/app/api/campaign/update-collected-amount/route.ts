import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextResponse } from "next/server";

interface UpdateCollectedAmountRequest {
  campaign_id: string;
  amount: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as UpdateCollectedAmountRequest;
    const { campaign_id, amount } = body;

    if (!campaign_id || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "campaign_id dan amount wajib diisi" },
        { status: 400 }
      );
    }

    const result = await updateCampaignCollectedAmount(
      campaign_id,
      amount
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}



export async function updateCampaignCollectedAmount(
  campaignId: string,
  amount: number
) {
  const supabase = await supabaseServer();

  // ambil collected_amount sekarang
  const { data: campaign, error: fetchError } = await supabase
    .from("campaigns")
    .select("collected_amount")
    .eq("id", campaignId)
    .single();

  if (fetchError || !campaign) {
    throw new Error("Campaign tidak ditemukan");
  }

  const newCollectedAmount =
    Number(campaign.collected_amount ?? 0) + amount;

  // update collected_amount (+ status jika tembus target)
  const { error: updateError } = await supabase
    .from("campaigns")
    .update({
      collected_amount: newCollectedAmount,
    })
    .eq("id", campaignId);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return {
    campaign_id: campaignId,
    collected_amount: newCollectedAmount,
  };
}
