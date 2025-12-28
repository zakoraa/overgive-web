import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";
import { convertGasFeeWeiToMatic, convertGasfeeToIDR } from "@/core/utils/convert-gas-fee-to-idr";

export async function POST(req: Request) {
  try {
    const { donation_id } = (await req.json());

    if (!donation_id) {
      return NextResponse.json({ error: "donation_id wajib diisi" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    const { data: donation } = await supabase
    .from("donations")
    .select("id, campaign_id, amount, currency, blockchain_tx_hash")
    .eq("id", donation_id)
    .single();


    if (!donation) {
      return NextResponse.json({ error: "Donasi tidak ditemukan" }, { status: 404 });
    }

    let gasFeeWei = BigInt(0);

    if (donation.blockchain_tx_hash) {
      try {
        const tx = await getTxByHash(donation.blockchain_tx_hash);

        if (tx?.gas && tx?.gasPrice) {
          const gasLimit = BigInt(tx.gas);
          const gasPrice = BigInt(tx.gasPrice);

          gasFeeWei = gasLimit * gasPrice;
        }
      } catch (e) {
        console.error("Error ambil TX:", e);
      }
    }

    const gasFeeMatic = convertGasFeeWeiToMatic(gasFeeWei);
    const maticToIdr = await convertGasfeeToIDR();
    const gasFeeIdr = gasFeeMatic * maticToIdr;

    const netAmount = donation.amount - gasFeeIdr;

    const { data: settlement, error: settlementError } = await supabase
      .from("donation_settlements")
     .insert([{
        donation_id: donation.id,
        campaign_id: donation.campaign_id,
        gross_amount: donation.amount,
        gas_fee: gasFeeIdr,
        net_amount: netAmount,
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
        gas_fee_idr: gasFeeIdr
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
