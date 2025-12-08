import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";
import { CategoriesCard } from "./components/categories_card";
import { CurrentCampaignsCard } from "./components/current_campaigns_card";
import { CurrentPriorityCard } from "./components/current_priority_card";

export const Home = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[600px]">
      <MarginTopNavbar />
      <CategoriesCard />
      <CurrentPriorityCard />
      <CurrentCampaignsCard />
      <div className="h-5"></div>
    </section>
  );
};
