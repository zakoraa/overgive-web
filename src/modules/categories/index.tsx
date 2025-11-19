import { CampaignHorizontalCard } from "@/components/donation_campaign_card/campaign-horizontal-card";
import { Label } from "@/components/text/label";
import { Title } from "@/components/text/title";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export const Categories = () => {
  return (
    <Card className="bg-card-background container mx-auto flex flex-col items-center justify-center space-y-2 rounded-none pb-5 md:max-w-[550px]">
      <div className="mt-3 flex w-full flex-col justify-start px-7">
        <Title text="Lingkungan" />
        <div className="mt-2 mb-4 h-[1.5px] w-full rounded-4xl bg-gray-300" />
        <div className="flex cursor-pointer items-center space-x-1">
          <Image
            src={"/icons/ic-sort.svg"}
            alt="icon-sort"
            height={20}
            width={20}
          />
          <Label text="Urutkan" />
        </div>
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
        <CampaignHorizontalCard key={i} />
      ))}
    </Card>
  );
};
