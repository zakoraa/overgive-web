"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CampaignHorizontalCard } from "@/core/components/donation_campaign_card/campaign-horizontal-card";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import BasePage from "@/core/layout/base-page";
import { useCampaignCategory } from "./providers/campaign-category-provider";
import CircularLoading from "@/core/components/ui/circular-loading";
import { SearchBar } from "@/core/components/search_bar/search-bar";
import { CampaignCategory } from "@/core/types/campaign-category";
import { CAMPAIGN_CATEGORY_LABEL } from "./types/campaign-category";

export const Categories = () => {
  const { campaigns, loading, error } = useCampaignCategory();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = (searchParams.get("cat") as CampaignCategory) ?? "others";

  const categoryLabel = CAMPAIGN_CATEGORY_LABEL[category] ?? "Lainnya";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <BasePage className="container mx-auto flex flex-col space-y-2 px-7 pb-5 md:max-w-[550px]">
      <div className="mt-3 w-full">
        <Title text={`Kategori ${categoryLabel}`} />
        <Line />
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <CircularLoading />}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && campaigns.length === 0 && (
        <p className="mt-2 text-xs text-gray-500">Kampanye belum tersedia</p>
      )}

      {!loading && (
        <div className="w-full space-y-3">
          {campaigns.map((campaign) => (
            <CampaignHorizontalCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </BasePage>
  );
};
