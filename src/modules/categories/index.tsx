// pages/categories.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { CampaignHorizontalCard } from "@/core/components/donation_campaign_card/campaign-horizontal-card";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import BasePage from "@/core/layout/base-page";
import CircularLoading from "@/core/components/ui/circular-loading";
import { SearchBar } from "@/core/components/search_bar/search-bar";
import { CAMPAIGN_CATEGORY_LABEL } from "./types/campaign-category";
import { useCampaignCategory } from "./hooks/use-campaign-category";
import { useEffect, useState } from "react";
import { useCategoryFromSearchParams } from "./hooks/use-categroy-from-search-params";

export const Categories = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { category, search } = useCategoryFromSearchParams();

  const [searchTerm, setSearchTerm] = useState(search ?? "");
  const [debouncedSearch, setDebouncedSearch] = useState(search ?? "");

  // debounce searchTerm sebelum fetch data
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError, isFetching } = useCampaignCategory(
    category,
    debouncedSearch,
  );

  // sync URL ke search setelah debounce
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("cat", category);
    if (debouncedSearch) params.set("q", debouncedSearch);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, category, pathname, router]);

  const categoryLabel = CAMPAIGN_CATEGORY_LABEL[category] ?? "Lainnya";

  return (
    <BasePage className="container mx-auto flex flex-col space-y-2 px-7 pb-5 md:max-w-[550px]">
      <div className="mt-3 w-full">
        <Title text={`Kategori ${categoryLabel}`} />
        <Line />
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {isLoading && <CircularLoading />}
      {isError && <p className="text-sm text-red-500">Gagal memuat kampanye</p>}
      {data?.length === 0 && !isLoading && (
        <p className="mt-2 text-xs text-gray-500">Kampanye belum tersedia</p>
      )}

      <div className="w-full space-y-3">
        {data?.map((campaign) => (
          <CampaignHorizontalCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {isFetching && !isLoading && <CircularLoading />}
    </BasePage>
  );
};
