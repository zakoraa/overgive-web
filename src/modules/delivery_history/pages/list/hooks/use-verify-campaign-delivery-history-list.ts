"use client";

import { useEffect, useState } from "react";
import { CampaignDeliveryHistoryList } from "../types/campaign-delivery-history";
import { generateCampaignDeliveryHash } from "../../detail/services/get-campaign-delivery-hash";
import { extractDeliveryHistoryHashFromInput } from "../../detail/utils/extract-delivery-history-hash-from-input";

export function useVerifyCampaignDeliveryHistoryList(
    history: CampaignDeliveryHistoryList | null
) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!history || !history.blockchain_input) return;

        const verify = async () => {
            setLoading(true);

            const regeneratedHash =
                generateCampaignDeliveryHash({
                    campaign_id: history.campaign_id,
                    title: history.title,
                    note: history.note,
                    created_by: history.created_by?.id,
                });
          
            if (!history.blockchain_input) {
                setIsValid(false);
                setLoading(false);
                return;
            }
            
            const blockchainHash =
            extractDeliveryHistoryHashFromInput(history.blockchain_input);
            
            setIsValid(
                blockchainHash !== null &&
                regeneratedHash === blockchainHash
            );

            setLoading(false);
        };

        verify();
    }, [history]);

    return {
        isValid,
        loading,
    };
}
