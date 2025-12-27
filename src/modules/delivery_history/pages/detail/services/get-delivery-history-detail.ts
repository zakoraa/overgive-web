"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

interface GetCampaignDeliveryHistoryByIdParams {
  campaign_delivery_history_id: string;
}

export async function getCampaignDeliveryHistoryById({
  campaign_delivery_history_id,
}: GetCampaignDeliveryHistoryByIdParams) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("campaign_delivery_histories")
    .select("*")
    .eq("id", campaign_delivery_history_id)
    .single();

  if (error || !data) {
    throw new Error("Campaign delivery history tidak ditemukan");
  }

  // default result
  const result = {
    id: data.id,
    campaign_id: data.campaign_id,
    title: data.title,
    note: data.note,
    delivery_hash: data.delivery_hash,
    created_by: data.created_by,
    created_at: data.created_at,
    blockchain_tx_hash: data.blockchain_tx_hash ?? null,
    blockchain_input: null as string | null,
  };

  if (!data.blockchain_tx_hash) {
    return result;
  }

  try {
    const tx = await getTxByHash(data.blockchain_tx_hash);

    return {
      ...result,
      blockchain_input: tx.input ?? null,
    };
  } catch {
    return result;
  }
}
