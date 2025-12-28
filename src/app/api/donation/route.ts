// app/api/donation/route.ts
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextResponse } from "next/server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

export async function GET(req: Request) {
  try {
    const supabase = await supabaseServer();
    const url = new URL(req.url);

    const user_id = url.searchParams.get("user_id");
    const campaign_id = url.searchParams.get("campaign_id");

    if (!user_id && !campaign_id) {
      return NextResponse.json(
        { error: "user_id atau campaign_id wajib diisi" },
        { status: 400 }
      );
    }

    let query = supabase
      .from("donations")
      .select(`
        *,
        campaign:campaigns (
          id,
          title,
          image_url,
          created_at
        )
      `);

    if (user_id) query = query.eq("user_id", user_id);
    if (campaign_id) query = query.eq("campaign_id", campaign_id);

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error || !data) {
      if (error?.code === "PGRST116") {
        return NextResponse.json(
          { error: "Donasi tidak ditemukan" },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    // ⛓️ ambil blockchain per donation
    const results = await Promise.all(
      data.map(async (donation) => {
        let blockchain = null;

        if (donation.blockchain_tx_hash) {
          try {
            const tx = await getTxByHash(donation.blockchain_tx_hash);
            blockchain = {
              hash: donation.blockchain_tx_hash,
              input: tx.input ?? null,
            };
          } catch {
            blockchain = null;
          }
        }

        return {
          ...donation,
          blockchain,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
