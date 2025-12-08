"use client";

import { useState, useEffect } from "react";
import { CampaignListType, getCampaignHome } from "../services/get-campaign-home";
import { CampaignHomeItem } from "../types/campaign-home-item";

export function useCampaignHome(type: CampaignListType, limit?: number) {
  const [campaigns, setCampaigns] = useState<CampaignHomeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCampaignHome({ type, limit });
      setCampaigns(data);
    } catch (err: any) {
      console.error("Failed to fetch campaigns:", err);
      setError(err.message || "Terjadi kesalahan saat mengambil campaign");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [type, limit]);

  return { campaigns, loading, error, refetch: fetchCampaigns };
}
