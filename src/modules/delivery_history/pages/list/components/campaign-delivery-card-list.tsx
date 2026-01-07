"use client";

import CircularLoading from "@/core/components/ui/circular-loading";
import { useCampaignDeliveryHistoriesContext } from "../providers/get-campaign-delivery-histories-provider";
import { CampaignDeliveryItem } from "./campaign-delivery-item";

export const CampaignDelivaryCard = () => {
  const { data, loading } = useCampaignDeliveryHistoriesContext();

  if (loading) {
    return <CircularLoading />;
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center text-xs text-gray-500">
        Belum ada kabar kampanye
      </p>
    );
  }

  return (
    <div className="space-y-3 flex flex-col">
      {data.map((item) => (
        <CampaignDeliveryItem key={item.id} item={item} />
      ))}
    </div>
  );
};
