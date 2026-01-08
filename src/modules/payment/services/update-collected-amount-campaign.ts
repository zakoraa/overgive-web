"use server";

export async function increaseCollectedAmount(
  supabase: any,
  campaignId: string,
  amount: number
) {
  const { data: campaign, error } = await supabase
    .from("campaigns")
    .select("collected_amount")
    .eq("id", campaignId)
    .single();

  if (error || !campaign) {
    throw new Error("Campaign tidak ditemukan");
  }

  const newAmount =
    Number(campaign.collected_amount ?? 0) + amount;

  const { error: updateError } = await supabase
    .from("campaigns")
    .update({ collected_amount: newAmount })
    .eq("id", campaignId);

  if (updateError) {
    throw updateError;
  }
}
