import { CampaignHorizontalCard } from "@/components/donation_campaign_card/campaign-horizontal-card";
import { Label } from "@/components/text/label";
import { Title } from "@/components/text/title";
import { Card } from "@/components/ui/card";
import { Line } from "@/components/ui/line";
import { SearchBarWithSort } from "@/components/ui/search-bar-with-sort";
import Image from "next/image";

export const Categories = () => {
  return (
    <Card className="bg-card-background container mx-auto flex flex-col items-center justify-center space-y-2 rounded-none pb-5 md:max-w-[550px]">
      <div className="mt-3 flex w-full flex-col justify-start px-7">
        <Title text="Lingkungan" />
        <Line />
        <SearchBarWithSort />
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
        <CampaignHorizontalCard key={i} />
      ))}
    </Card>
  );
};
