import { CampaignDeliveryHistoryUser } from "@/core/types/campaign-delivery-history-user";

export interface CampaignDeliveryHistoryList {
    id: string;
    title: string;
    note: string | null;
    created_at: string;
    created_by: CampaignDeliveryHistoryUser;
    blockchain_tx_hash: string | null;
    blockchain_input: string | null;
}
