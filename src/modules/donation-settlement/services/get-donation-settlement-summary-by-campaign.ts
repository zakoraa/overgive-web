"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { convertGasFeeWeiToMatic } from "@/core/utils/convert-gas-fee-to-idr";
import { convertGasfeeToIDR } from "@/core/utils/convert-gas-fee-to-idr";
import { calculateQrisFee } from "@/core/utils/calculate-qris-xendit";
import { sleep } from "@/core/utils/sleep";
import { getTxReceiptByHash } from "@/core/services/get-transactions-from-tx-hash";

export const getDonationSettlementSummaryByCampaign = async (
  campaignId: string
) => {
  const supabase = await supabaseServer();

  const { data: donations, error } = await supabase
    .from("donations")
    .select(`
      id,
      amount,
      currency,
      blockchain_tx_hash,
      created_at,
      campaigns ( title )
    `)
    .eq("campaign_id", campaignId)
    .not("blockchain_tx_hash", "is", null);

  if (error) throw error;
  if (!donations || donations.length === 0) throw new Error("No settlements found");
  const campaign = donations[0].campaigns as unknown as {
    title: string;
  };

  const campaignTitle = campaign?.title ?? "";

  const maticToIdr = await convertGasfeeToIDR();

  let totalGross = 0;
  let totalGasFee = 0;
  let totalXenditFee = 0;

  for (const donation of donations) {
    totalGross += donation.amount;

      await sleep(350);

      const receipt = await getTxReceiptByHash(
        donation.blockchain_tx_hash
      );

      if (!receipt?.gasUsed || !receipt?.effectiveGasPrice) {
        continue; 
      }

      const gasUsed = BigInt(receipt.gasUsed);
      const gasPrice = BigInt(receipt.effectiveGasPrice);

    const gasFeeWei = gasUsed * gasPrice;
    const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
    const gasFeeIdr = gasFeeMatic * maticToIdr;

    const xenditFee = calculateQrisFee(donation.amount);

    totalGasFee += gasFeeIdr;
    totalXenditFee += xenditFee;
  }

  
  const { data: opsCosts } = await supabase
    .from("campaign_operational_costs")
    .select("amount, note")
    .eq("campaign_id", campaignId)
    .is("deleted_at", null);

  const totalOperational =
    opsCosts?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;

  const totalFee = totalGasFee + totalXenditFee;
  const totalNet = totalGross - totalFee;
  const finalNet = totalNet - totalOperational;

  return {
    campaign_title: campaignTitle,
    total_gross: totalGross,
    total_gas_fee: totalGasFee,
    total_xendit_fee: totalXenditFee,
    total_fee: totalFee,
    total_net: totalNet,
    operational_fees: opsCosts ?? [],
    total_operational: totalOperational,
    final_net: finalNet,
    currency: "IDR",
  };
};


// import { supabaseServer } from "@/core/lib/supabase/supabase-server";
// import { DonationSettlementSummary } from "../types/donation-settlement";

// export const getDonationSettlementSummaryByCampaign = async (
//   campaignId: string
// ): Promise<DonationSettlementSummary> => {
//   const supabase = await supabaseServer();

//   // Ambil semua settlement + campaign title
//   const { data: settlements, error: settlementsError } = await supabase
//     .from("donation_settlements")
//     .select(`
//       *,
//       campaigns (title)
//     `)
//     .eq("campaign_id", campaignId);

//   if (settlementsError) throw settlementsError;
//   if (!settlements || settlements.length === 0) throw new Error("No settlements found");

//   const campaignTitle = settlements[0].campaigns?.title ?? "";

//   // Ambil semua operational cost per item
//   const { data: opsCosts, error: opsError } = await supabase
//     .from("campaign_operational_costs")
//     .select("id, amount, note")
//     .eq("campaign_id", campaignId)
//     .is("deleted_at", null);

//   if (opsError) throw opsError;

//   const totalOperational = opsCosts?.reduce((acc, cur: any) => acc + cur.amount, 0) ?? 0;

//   // Hitung total dari donation settlements
//   const totalGross = settlements.reduce((acc, cur) => acc + cur.gross_amount, 0);
//   const totalGasFee = settlements.reduce((acc, cur) => acc + cur.gas_fee, 0);
//   const totalXenditFee = settlements.reduce((acc, cur) => acc + cur.xendit_fee, 0);
//   const totalFee = settlements.reduce((acc, cur) => acc + cur.total_fee, 0);
//   const totalNet = settlements.reduce((acc, cur) => acc + cur.net_amount, 0);

//   const finalNet = totalNet - totalOperational;

//   // Ambil updated_at terbaru
//   const latestUpdatedAt = settlements
//     .map(s => new Date(s.updated_at))
//     .sort((a, b) => b.getTime() - a.getTime())[0]
//     ?.toISOString();

//   return {
//     campaign_title: campaignTitle,
//     total_gross: totalGross,
//     total_gas_fee: totalGasFee,
//     total_xendit_fee: totalXenditFee,
//     total_fee: totalFee,
//     total_net: totalNet,
//     operational_fees: opsCosts ?? [], // array of {amount, note}
//     total_operational: totalOperational,
//     final_net: finalNet,
//     currency: settlements[0].currency,
//     updated_at: latestUpdatedAt
//   };
// };

