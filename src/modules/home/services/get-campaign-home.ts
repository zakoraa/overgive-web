"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignHomeItem } from "../types/campaign-home-item";

export type CampaignListType = "priority" | "current";

export const getCampaignHome = async ({
  type,
  limit = 10,
}: {
  type: CampaignListType;
  limit?: number;
}): Promise<CampaignHomeItem[]> => {
  const supabase = await supabaseServer();
  const now = new Date().toISOString();

  let query = supabase
    .from("campaigns")
    .select(
      "id, title, created_at, collected_amount, target_amount, ended_at, image_url"
    )
    .eq("status", "active")                // ✅ hanya campaign aktif
    .is("deleted_at", null)
    // ✅ belum berakhir ATAU tanpa ended_at
    .or(`ended_at.gte.${now},ended_at.is.null`)
    .limit(limit);

  if (type === "priority") {
    // ✅ yang hampir berakhir tampil paling atas
    // ✅ campaign tanpa batas waktu di bawah
    query = query.order("ended_at", {
      ascending: true,
      nullsFirst: false,
    });
  }

  if (type === "current") {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as CampaignHomeItem[];
};
