// src/modules/donation_campaign/providers/campaign-detail-provider.tsx
"use client";

import { Campaign } from "@/core/types/campaign";
import { createContext, useContext, useState, ReactNode } from "react";

interface CampaignDetailContextValue {
  campaign: Campaign | null;
  setCampaign: (data: Campaign | null) => void;
}

const CampaignDetailContext = createContext<
  CampaignDetailContextValue | undefined
>(undefined);

interface CampaignDetailProviderProps {
  children: ReactNode;
  initialCampaign?: Campaign;
}

export const CampaignDetailProvider = ({
  children,
  initialCampaign,
}: CampaignDetailProviderProps) => {
  const [campaign, setCampaign] = useState<Campaign | null>(
    initialCampaign ?? null,
  );

  return (
    <CampaignDetailContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignDetailContext.Provider>
  );
};

export const useCampaignDetailContext = () => {
  const context = useContext(CampaignDetailContext);
  if (!context)
    throw new Error(
      "useCampaignDetailContext must be used within CampaignDetailProvider",
    );
  return context;
};
