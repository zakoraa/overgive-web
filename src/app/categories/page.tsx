import { CampaignCategory } from "@/core/types/campaign-category";
import { Categories } from "@/modules/categories";
import { CampaignCategoryProvider } from "@/modules/categories/providers/campaign-category-provider";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    cat?: CampaignCategory;
    q?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <CampaignCategoryProvider
      category={params.cat ?? "others"}
      search={params.q}
    >
      <Categories />
    </CampaignCategoryProvider>
  );
}
