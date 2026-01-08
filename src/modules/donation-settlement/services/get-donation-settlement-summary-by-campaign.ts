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

    const xenditFee = calculateQrisFee(donation.amount);
    totalXenditFee += xenditFee;

    await sleep(350);

    try {
      const receipt = await getTxReceiptByHash(donation.blockchain_tx_hash);
      if (!receipt?.gasUsed || !receipt?.effectiveGasPrice) continue;

      const gasUsed = BigInt(receipt.gasUsed);
      const gasPrice = BigInt(receipt.effectiveGasPrice);

      const gasFeeWei = gasUsed * gasPrice;
      const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
      const gasFeeIdr = gasFeeMatic * maticToIdr;

      totalGasFee += gasFeeIdr;
    } catch (e) {
      // tetap skip gas fee tapi jangan stop xendit
    }
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