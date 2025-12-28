"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { DonationSettlementMeta } from "../types/donation-settlement";

export const getLatestDonationSettlementMetaByCampaign = async (
  campaignId: string
): Promise<DonationSettlementMeta | null> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("donation_settlements")
    .select("id, updated_at")
    .eq("campaign_id", campaignId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};
