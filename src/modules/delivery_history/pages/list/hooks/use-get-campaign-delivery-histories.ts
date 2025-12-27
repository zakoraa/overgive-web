"use client";

import { useEffect, useState } from "react";
import { getCampaignDeliveryHistories } from "../services/get-campaign-delivery-histories-by-campaign-id";
import { CampaignDeliveryHistoryList } from "../types/campaign-delivery-history";

export function useCampaignDeliveryHistories(
    campaign_id: string
) {
    const [data, setData] = useState<CampaignDeliveryHistoryList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const result =
                await getCampaignDeliveryHistories({
                    campaign_id,
                    search
                });

            setData(result);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [campaign_id, search]);

    return {
        data,
        loading,
        error,
        search,
        setSearch,
        refresh: fetchData,
    };
}
