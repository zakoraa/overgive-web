import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await supabaseServer();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "donation id wajib diisi" },
        { status: 400 }
      );
    }

    const { data: donation, error } = await supabase
      .from("donations")
      .select(`
        *,
        campaign:campaigns (
          id,
          title
        )
      `)
      .eq("id", id)
      .single();

    if (error || !donation) {
      if (error?.code === "PGRST116") {
        return NextResponse.json(
          { error: "Donasi tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    let blockchain = null;
    if (donation.blockchain_tx_hash) {
      try {
        blockchain = await getTxByHash(donation.blockchain_tx_hash);
      } catch {
        blockchain = null;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...donation,
        blockchain,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
