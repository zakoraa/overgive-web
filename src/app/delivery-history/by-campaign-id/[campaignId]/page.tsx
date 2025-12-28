"use client";

import { DeliveryList } from "@/modules/delivery_history/pages/list";
import { CampaignDeliveryHistoriesProvider } from "@/modules/delivery_history/pages/list/providers/get-campaign-delivery-histories-provider";

interface PageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { campaignId } = await params;

  return (
    <CampaignDeliveryHistoriesProvider campaignId={campaignId}>
      <DeliveryList />;
    </CampaignDeliveryHistoriesProvider>
  );
}
