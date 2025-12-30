"use client";

import { useMemo } from "react";
import { generateCampaignDeliveryHash } from "../services/get-campaign-delivery-hash";
import { CampaignDeliveryHistoryDetail } from "../types/get-delivery-history-detail";
import { extractDeliveryHistoryHashFromInput } from "../utils/extract-delivery-history-hash-from-input";

export function useVerifyCampaignDeliveryHistory(
  history: CampaignDeliveryHistoryDetail | null
) {
  const isValid = useMemo(() => {
    if (!history || !history.blockchain_input) return null;

    const regeneratedHash = generateCampaignDeliveryHash({
      campaign_id: history.campaign_id,
      title: history.title,
      note: history.note,
      created_by: history.created_by?.id,
    });

    const blockchainHash =
      extractDeliveryHistoryHashFromInput(history.blockchain_input);

    if (!blockchainHash) return false;

    return regeneratedHash === blockchainHash;
  }, [history]);

  return {
    isValid,
    loading: false,
  };
}
