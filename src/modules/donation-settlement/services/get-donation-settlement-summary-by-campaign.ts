"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { DonationSettlementSummary } from "../types/donation-settlement";

export const getDonationSettlementSummaryByCampaign = async (
  campaignId: string
): Promise<DonationSettlementSummary> => {
  const supabase = await supabaseServer();

  // Ambil semua settlement + campaign title
  const { data: settlements, error: settlementsError } = await supabase
    .from("donation_settlements")
    .select(`
      *,
      campaigns (title)
    `)
    .eq("campaign_id", campaignId);

  if (settlementsError) throw settlementsError;
  if (!settlements || settlements.length === 0) throw new Error("No settlements found");

  const campaignTitle = settlements[0].campaigns?.title ?? "";

  // Ambil semua operational cost per item
  const { data: opsCosts, error: opsError } = await supabase
    .from("campaign_operational_costs")
    .select("id, amount, note")
    .eq("campaign_id", campaignId)
    .is("deleted_at", null);

  if (opsError) throw opsError;

  const totalOperational = opsCosts?.reduce((acc, cur: any) => acc + cur.amount, 0) ?? 0;

  // Hitung total dari donation settlements
  const totalGross = settlements.reduce((acc, cur) => acc + cur.gross_amount, 0);
  const totalGasFee = settlements.reduce((acc, cur) => acc + cur.gas_fee, 0);
  const totalXenditFee = settlements.reduce((acc, cur) => acc + cur.xendit_fee, 0);
  const totalFee = settlements.reduce((acc, cur) => acc + cur.total_fee, 0);
  const totalNet = settlements.reduce((acc, cur) => acc + cur.net_amount, 0);

  const finalNet = totalNet - totalOperational;

  // Ambil updated_at terbaru
  const latestUpdatedAt = settlements
    .map(s => new Date(s.updated_at))
    .sort((a, b) => b.getTime() - a.getTime())[0]
    ?.toISOString();

  return {
    campaign_title: campaignTitle,
    total_gross: totalGross,
    total_gas_fee: totalGasFee,
    total_xendit_fee: totalXenditFee,
    total_fee: totalFee,
    total_net: totalNet,
    operational_fees: opsCosts ?? [], // array of {amount, note}
    total_operational: totalOperational,
    final_net: finalNet,
    currency: settlements[0].currency,
    updated_at: latestUpdatedAt
  };
};
