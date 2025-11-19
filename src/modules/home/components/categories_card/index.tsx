import { Title } from "@/components/text/title";
import { Card } from "@/components/ui/card";
import { CategoriesGrid } from "./categories_grid";

export const CategoriesCard = () => {
  return (
    <Card className="w-full px-10 py-6">
      <Title size="sm" text="Satu donasi kecil, satu harapan besar" />
      <CategoriesGrid />
    </Card>
  );
};
