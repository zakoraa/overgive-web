import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";
import { convertGasFeeWeiToMatic, convertGasfeeToIDR } from "@/core/utils/convert-gas-fee-to-idr";
import { calculateQrisFee } from "@/core/utils/calculate-qris-xendit";

export async function POST(req: Request) {
  try {
    const { donation_id } = (await req.json());

    if (!donation_id) {
      return NextResponse.json({ error: "donation_id wajib diisi" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    const { data: donation } = await supabase
    .from("donations")
    .select("id, campaign_id, amount, currency, blockchain_tx_hash, blockchain_gas_used, blockchain_gas_price")
    .eq("id", donation_id)
    .single();


    if (!donation) {
      return NextResponse.json({ error: "Donasi tidak ditemukan" }, { status: 404 });
    }

    let gasFeeWei = BigInt(0);

    if (donation.blockchain_tx_hash) {
      try {

        if (donation?.blockchain_gas_used && donation?.blockchain_gas_price) {
          const gasLimit = BigInt(donation?.blockchain_gas_used);
          const gasPrice = BigInt(donation?.blockchain_gas_price);

          gasFeeWei = gasLimit * gasPrice;
        }
      } catch (e) {
        // console.error("Error ambil TX:", e);
        return NextResponse.json({ error: "Gagal melakukan donasi, mohon dicoba lagi!" }, { status: 500 });
      }
    }

    const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
    const maticToIdr = await convertGasfeeToIDR();
    const gasFeeIdr = gasFeeMatic * maticToIdr;

    const xenditFee = calculateQrisFee(donation.amount);

    const netAmount =
      donation.amount - gasFeeIdr - xenditFee;

    const { data: settlement, error: settlementError } = await supabase
      .from("donation_settlements")
     .insert([{
        donation_id: donation.id,
        campaign_id: donation.campaign_id,
        gross_amount: donation.amount,
        gas_fee: gasFeeIdr,
        net_amount: netAmount,
        xendit_fee: xenditFee,
        currency: "IDR"
     }])
      .select()
      .single();

    if (settlementError) {
      return NextResponse.json({ error: settlementError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...settlement,
        gas_fee_matic: gasFeeMatic,
        gas_fee_idr: gasFeeIdr,
        xendit_fee: xenditFee,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
