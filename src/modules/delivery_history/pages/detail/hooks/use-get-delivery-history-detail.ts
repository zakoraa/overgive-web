"use client";

import { useEffect, useState } from "react";
import { getCampaignDeliveryHistoryById } from "../services/get-delivery-history-detail";
import { CampaignDeliveryHistoryDetail } from "../types/get-delivery-history-detail";

export function useCampaignDeliveryHistoryDetail(
    campaignDeliveryHistoryId: string
) {
    const [data, setData] =
        useState<CampaignDeliveryHistoryDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDetail = async () => {
        if (!campaignDeliveryHistoryId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await getCampaignDeliveryHistoryById({
                campaign_delivery_history_id: campaignDeliveryHistoryId,
            });

            setData(result);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [campaignDeliveryHistoryId]);

    return {
        data,
        loading,
        error,
        refresh: fetchDetail,
    };
}
