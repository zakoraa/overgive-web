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
    imageUrl: data.image_url,
    backgroundHtml: data.background_html,
    category: data.category,
    targetAmount: data.target_amount,
    collectedAmount: data.collected_amount,
    status: data.status,
    createdBy: data.created_by,
    endedAt: data.ended_at,
    createdAt: data.created_at,
    deletedAt: data.deleted_at,
  };


  return campaign;
};

