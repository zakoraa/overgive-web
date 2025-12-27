"use client";

import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import { CampaignDelivaryCard } from "./components/campaign-delivery-card";
import { useRouter } from "next/navigation";
import { useCampaignDeliveryHistoriesContext } from "./providers/get-campaign-delivery-histories-provider";
import { SearchBar } from "@/core/components/search_bar/search-bar";

interface DeliveryListProps {
  campaignId: string;
}

export const DeliveryList = ({ campaignId }: DeliveryListProps) => {
  const router = useRouter();

  const { search, setSearch } = useCampaignDeliveryHistoriesContext();
  return (
    <div className="relative pb-20">
      <Card className="m-auto rounded-t-none p-6 lg:max-w-[50%]">
        <Title text="Kabar Terbaru Kampanye" />
        <Line />
        <div className="mt-5 mb-3 flex items-center justify-between gap-10">
          <SearchBar
            placeholder="Cari judul..."
            // value={search}
            onSearch={setSearch}
          />
        </div>

        <CampaignDelivaryCard />
      </Card>
    </div>
  );
};
