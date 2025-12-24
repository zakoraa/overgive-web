import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextResponse } from "next/server";

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

    let query = supabase.from("donations").select("*");

    if (user_id) query = query.eq("user_id", user_id);
    if (campaign_id) query = query.eq("campaign_id", campaign_id);

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
