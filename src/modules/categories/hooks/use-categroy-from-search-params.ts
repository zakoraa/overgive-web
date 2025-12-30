// hooks/use-category-from-search-params.ts
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CampaignCategory } from "@/core/types/campaign-category";

export function useCategoryFromSearchParams() {
  const searchParams = useSearchParams();

  const category = useMemo(() => {
    const cat = searchParams.get("cat") as CampaignCategory;
    return cat ?? "others";
  }, [searchParams]);

  const search = useMemo(() => searchParams.get("q") ?? "", [searchParams]);

  return { category, search };
}
