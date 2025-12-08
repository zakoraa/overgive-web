export interface CampaignHomeItem {
  id: string;
  title: string;
  created_at: string;
  collected_amount: number;
  target_amount: number;
  ended_at: string;
  image_url: string;
}

export interface GetCampaignsHomeResult {
  priorityCampaigns: CampaignHomeItem[];
  currentCampaigns: CampaignHomeItem[];
}