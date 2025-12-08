"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignCategory } from "@/core/types/campaign-category";
import { CampaignHomeItem } from "@/modules/home/types/campaign-home-item";

export async function getCampaignsByCategory({
  category,
  search,
}: {
  category: CampaignCategory;
  search?: string;
}): Promise<CampaignHomeItem[]> {
  const supabase = await supabaseServer();
  const now = new Date().toISOString();

  let query = supabase
    .from("campaigns")
    .select(
      "id, title, created_at, collected_amount, target_amount, ended_at, image_url"
    )
    .eq("category", category)
    .eq("status", "active")
    .is("deleted_at", null)
    // ✅ ended_at >= now ATAU ended_at IS NULL
    .or(`ended_at.gte.${now},ended_at.is.null`)
    // ✅ yang paling dekat berakhir di atas
    .order("ended_at", { ascending: true, nullsFirst: false });

  if (search?.trim()) {
    query = query.ilike("title", `%${search.trim()}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data ?? []) as CampaignHomeItem[];
}
