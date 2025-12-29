"use client";

import { DeliveryList } from "@/modules/delivery_history/pages/list";
import { CampaignDeliveryHistoriesProvider } from "@/modules/delivery_history/pages/list/providers/get-campaign-delivery-histories-provider";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <CampaignDeliveryHistoriesProvider campaignId={id}>
      <DeliveryList/>;
    </CampaignDeliveryHistoriesProvider>
  );
}
