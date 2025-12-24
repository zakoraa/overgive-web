"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { Campaign } from "@/core/types/campaign";

export const getCampaignDetails = async (id: string): Promise<Campaign | null> => {
  const supabase = await supabaseServer();
  console.log(`ID: ${id}`)

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  console.log(`data: ${data}`)

  if (error) {
    console.log(`erro:`, error)
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  if (!data) return null;

  const campaign: Campaign = {
    id: data.id,
    title: data.title,
    image_url: data.image_url,
    background_html: data.background_html,
    category: data.category,
    target_amount: data.target_amount,
    collected_amount: data.collected_amount,
    status: data.status,
    created_by: data.created_by,
    ended_at: data.ended_at,
    created_at: data.created_at,
    deleted_at: data.deleted_at,
  };


  return campaign;
};

