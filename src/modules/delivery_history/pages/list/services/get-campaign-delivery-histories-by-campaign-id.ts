"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { getTxByHash } from "@/core/services/get-transactions-from-tx-hash";

interface GetCampaignDeliveryHistoriesParams {
    campaign_id: string;
    search?: string;
}

export async function getCampaignDeliveryHistories({
    campaign_id,
    search,
}: GetCampaignDeliveryHistoriesParams) {
    const supabase = await supabaseServer();

    let query = supabase
        .from("campaign_delivery_histories")
        .select("id, title, note, created_at, blockchain_tx_hash")
        .eq("campaign_id", campaign_id)
        .order("created_at", { ascending: false });

    if (search && search.trim() !== "") {
        query = query.ilike("title", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        return [];
    }

    const results = await Promise.all(
        data.map(async (item) => {
            const baseResult = {
                id: item.id,
                title: item.title,
                note: item.note,
                created_at: item.created_at,
                blockchain_tx_hash: item.blockchain_tx_hash ?? null,
                blockchain_input: null as string | null,
            };

            if (!item.blockchain_tx_hash) {
                return baseResult;
            }

            try {
                const tx = await getTxByHash(item.blockchain_tx_hash);

                return {
                    ...baseResult,
                    blockchain_input: tx.input ?? null,
                };
            } catch {
                return baseResult;
            }
        })
    );

    return results;
}
