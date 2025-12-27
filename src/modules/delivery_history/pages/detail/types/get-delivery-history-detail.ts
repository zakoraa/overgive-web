import { CampaignDeliveryHistoryUser } from "@/core/types/campaign-delivery-history-user";

export interface CampaignDeliveryHistoryDetail {
  id: string;
  campaign_id: string;
  title: string;
  note: string | null;
  delivery_hash: string;
  created_by: CampaignDeliveryHistoryUser;
  created_at: string;
  blockchain_tx_hash: string | null;
  blockchain_input: string | null;
}
