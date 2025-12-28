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

            // 1️⃣ regenerate hash dari DB
            const regeneratedHash =
                generateCampaignDeliveryHash({
                    campaign_id: history.campaign_id,
                    title: history.title,
                    note: history.note,
                    created_by: history.created_by?.id,
                });
            console.log("REGENREDD HASH: ", regeneratedHash);
            console.log("history.blockchain_input: ", history.blockchain_input);
            if (!history.blockchain_input) {
                setIsValid(false);
                setLoading(false);
                return;
            }
            
            // 2️⃣ ambil hash dari blockchain input
            const blockchainHash =
            extractDeliveryHistoryHashFromInput(history.blockchain_input);
            
            console.log("blockchainHash: ", blockchainHash);
            // 3️⃣ bandingkan
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
