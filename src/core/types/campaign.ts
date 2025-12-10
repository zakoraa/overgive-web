import { CampaignCategory } from "./campaign-category";
import { CampaignStatus } from "./campaign-status";

export interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  backgroundHtml: string;
  category: CampaignCategory;
  targetAmount: number;
  collectedAmount: number;
  status: CampaignStatus;
  createdBy: string;
  endedAt?: string;
  createdAt: string;
  deletedAt?: string;
}

