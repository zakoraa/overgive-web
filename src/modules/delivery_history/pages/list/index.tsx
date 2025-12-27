"use client";

import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import { CampaignDelivaryCard } from "./components/campaign-delivery-card";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCampaignDeliveryHistoriesContext,
} from "./providers/get-campaign-delivery-histories-provider";
import { SearchBar } from "@/core/components/search_bar/search-bar";
import { AppButtonSm } from "@/core/components/button/app-button-sm";

interface DeliveryListProps {
  campaignId: string;
}

export const DeliveryList = ({ campaignId }: DeliveryListProps) => {
  const router = useRouter();

  const { search, setSearch } = useCampaignDeliveryHistoriesContext();
  return (
      <div className="relative pb-20">
        <Card className="m-auto p-6 lg:max-w-[50%] rounded-t-none">
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

        <Card className="fixed inset-x-0 bottom-0 mx-auto flex w-full items-center justify-center rounded-b-none bg-white px-6 py-4 lg:max-w-[50%]">
          <AppButtonSm
            onClick={() => router.push(`/campaign/${campaignId}/create`)}
            text="Tambah Kabar"
            icon={<PlusIcon />}
            className="h-14 w-full!"
          />
        </Card>
      </div>
  );
};
