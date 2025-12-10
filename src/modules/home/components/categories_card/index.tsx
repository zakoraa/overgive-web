import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { CategoriesGrid } from "./categories-grid";
import { SearchButton } from "../search-button";

export const CategoriesCard = () => {
  return (
    <Card className="w-full px-10 py-6">
      <SearchButton />
      <Title
        size="sm"
        className="mt-3"
        text="Satu donasi kecil, satu harapan besar"
      />
      <CategoriesGrid />
    </Card>
  );
};
