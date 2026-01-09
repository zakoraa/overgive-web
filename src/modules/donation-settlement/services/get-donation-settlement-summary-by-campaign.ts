"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxReceiptByHash } from "@/core/services/get-transactions-from-tx-hash";
import { calculateQrisFee } from "@/core/utils/calculate-qris-xendit";
import { convertGasfeeToIDR, convertGasFeeWeiToMatic } from "@/core/utils/convert-gas-fee-to-idr";
import { sleep } from "@/core/utils/sleep";

export const getDonationSettlementSummaryByCampaign = async (
  campaignId: string
) => {
  const supabase = await supabaseServer();

  // Ambil donations yang punya blockchain_tx_hash
  const { data: donations, error: donationsError } = await supabase
    .from("donations")
    .select(`
      id,
      amount,
      currency,
      blockchain_tx_hash,
      campaigns ( id, title )
    `)
    .eq("campaign_id", campaignId)
    .not("blockchain_tx_hash", "is", null);

  if (donationsError) throw donationsError;

  // Ambil campaign delivery histories yang punya blockchain_tx_hash
  const { data: deliveryHistories, error: deliveryError } = await supabase
    .from("campaign_delivery_histories")
    .select(`
      id,
      blockchain_tx_hash
    `)
    .eq("campaign_id", campaignId)
    .not("blockchain_tx_hash", "is", null);

  if (deliveryError) throw deliveryError;

  if ((!donations || donations.length === 0) && (!deliveryHistories || deliveryHistories.length === 0)) {
    throw new Error("No settlements found");
  }

  const campaign = donations?.[0]?.campaigns as unknown as {
    id: string;
    title: string;
  } ?? { id: campaignId, title: "" };

  const campaignID = campaign?.id ?? "";
  const campaignTitle = campaign?.title ?? "";

  const maticToIdr = await convertGasfeeToIDR();

  let totalGross = 0;
  let totalDonationGasFee = 0;
  let totalDeliveryGasFee = 0;
  let totalXenditFee = 0;

  if (donations) {
    for (const donation of donations) {
      totalGross += donation.amount;

      await sleep(350); 
      const receipt = await getTxReceiptByHash(donation.blockchain_tx_hash);

      if (!receipt?.gasUsed || !receipt?.effectiveGasPrice) continue;

      const gasUsed = BigInt(receipt.gasUsed);
      const gasPrice = BigInt(receipt.effectiveGasPrice);

      const gasFeeWei = gasUsed * gasPrice;
      const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
      const gasFeeIdr = gasFeeMatic * maticToIdr;

      totalDonationGasFee += gasFeeIdr;
      totalXenditFee += calculateQrisFee(donation.amount);
    }
  }

  // Hitung gas fee campaign delivery
  if (deliveryHistories) {
    for (const delivery of deliveryHistories) {
      await sleep(350);
      const receipt = await getTxReceiptByHash(delivery.blockchain_tx_hash);
      if (!receipt?.gasUsed || !receipt?.effectiveGasPrice) continue;

      const gasUsed = BigInt(receipt.gasUsed);
      const gasPrice = BigInt(receipt.effectiveGasPrice);

      const gasFeeWei = gasUsed * gasPrice;
      const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
      const gasFeeIdr = gasFeeMatic * maticToIdr;

      totalDeliveryGasFee += gasFeeIdr;
    }
  }

  // Ambil operational costs
  const { data: opsCosts } = await supabase
    .from("campaign_operational_costs")
    .select("id, amount, note, receipt_image_url")
    .eq("campaign_id", campaignId)
    .is("deleted_at", null);

  const totalOperational =
    opsCosts?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;

  const totalFee = totalDonationGasFee + totalXenditFee + totalDeliveryGasFee;
  const totalNet = totalGross - (totalDonationGasFee + totalXenditFee);
  const finalNet = totalNet - totalOperational;

  return {
    campaign_id: campaignID,
    campaign_title: campaignTitle,
    total_gross: totalGross,
    total_donation_gas_fee: totalDonationGasFee,
    total_delivery_gas_fee: totalDeliveryGasFee,
    total_xendit_fee: totalXenditFee,
    total_fee: totalFee,
    total_net: totalNet,
    operational_fees: opsCosts ?? [],
    total_operational: totalOperational,
    final_net: finalNet,
    currency: "IDR",
  };
};
