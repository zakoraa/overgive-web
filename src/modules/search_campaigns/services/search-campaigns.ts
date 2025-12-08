"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";

export async function searchCampaigns({
  search,
}: {
  search?: string;
}): Promise<CampaignHomeItem[]> {
  const supabase = await supabaseServer();
  const now = new Date().toISOString();

  let query = supabase
    .from("campaigns")
    .select(
      "id, title, created_at, collected_amount, target_amount, ended_at, image_url"
    )
    .eq("status", "active")
    .is("deleted_at", null)
    // ✅ belum berakhir ATAU tanpa ended_at
    .or(`ended_at.gte.${now},ended_at.is.null`)
    // ✅ yang hampir berakhir di atas
    .order("ended_at", { ascending: true, nullsFirst: false });

  if (search?.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as CampaignHomeItem[];
}
