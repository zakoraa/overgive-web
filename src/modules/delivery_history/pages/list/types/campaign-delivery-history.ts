export interface CampaignDeliveryHistoryList {
    id: string;
    title: string;
    note: string | null;
    created_at: string;
    blockchain_tx_hash: string | null;
    blockchain_input: string | null;
}
