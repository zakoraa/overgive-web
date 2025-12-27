export interface CampaignDeliveryHistorySummary {
    count: number;
    latest_created_at: string | null;
}

export interface GetCampaignDeliveryHistorySummaryParams {
    campaign_id: string;
}
