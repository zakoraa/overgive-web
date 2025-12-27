"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignDeliveryHistorySummary, GetCampaignDeliveryHistorySummaryParams } from "../types/get-delivery-history-summary";


export async function getCampaignDeliveryHistorySummary({
    campaign_id,
}: GetCampaignDeliveryHistorySummaryParams): Promise<CampaignDeliveryHistorySummary> {
    const supabase = await supabaseServer();

    const { data, error, count } = await supabase
        .from("campaign_delivery_histories")
        .select("created_at", {
            count: "exact",
            head: false,
        })
        .eq("campaign_id", campaign_id)
        .order("created_at", { ascending: false })
        .limit(1);

    if (error) {
        throw new Error(error.message);
    }

    return {
        count: count ?? 0,
        latest_created_at: data?.[0]?.created_at ?? null,
    };
}
