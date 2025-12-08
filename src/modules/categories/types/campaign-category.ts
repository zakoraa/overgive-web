import { CampaignCategory } from "@/core/types/campaign-category";

export const CATEGORY_MAP: Record<string, CampaignCategory> = {
  Pendidikan: "education",
  Lingkungan: "environment",
  "Bencana Alam": "natural_disaster",
  Kesehatan: "health",
  "Panti Asuhan": "orphanage",
  "Rumah Ibadah": "worship_place",
  Difabel: "disability",
  Lainnya: "others",
};

export const CAMPAIGN_CATEGORY_LABEL: Record<CampaignCategory, string> = {
  education: "Pendidikan",
  environment: "Lingkungan",
  natural_disaster: "Bencana Alam",
  health: "Kesehatan",
  orphanage: "Panti Asuhan",
  worship_place: "Rumah Ibadah",
  disability: "Difabel",
  others: "Lainnya",
};

