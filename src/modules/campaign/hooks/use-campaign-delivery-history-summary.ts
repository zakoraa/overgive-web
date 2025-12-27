"use client";

import { useEffect, useState } from "react";
import { getCampaignDeliveryHistorySummary } from "../services/get-campaign-delivery-history-summary";
import { CampaignDeliveryHistorySummary } from "../types/get-delivery-history-summary";

export function useCampaignDeliveryHistorySummary(campaign_id: string) {
    const [data, setData] = useState<CampaignDeliveryHistorySummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!campaign_id) return;

        setLoading(true);

        getCampaignDeliveryHistorySummary({ campaign_id })
            .then(setData)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [campaign_id]);

    return {
        data,
        loading,
        error,
    };
}
