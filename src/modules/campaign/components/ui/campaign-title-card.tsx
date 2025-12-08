import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import Image from "next/image";

interface CampaignTitleCardProps {
  title: string;
  count: number;
  onClick: () => void;
}

export const CampaignTitleCard = ({
  title,
  count,
  onClick,
}: CampaignTitleCardProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Title size="sm" text={title} />
        {count > 0 && (
          <Card className="bg-primary-faded text-primary-dark w-fit! border-none px-3 text-sm font-black">
            {count}
          </Card>
        )}
      </div>

      <div
        className="text-primary-dark flex cursor-pointer items-center space-x-1 text-sm font-bold"
        onClick={onClick}
      >
        <p>Lihat semua</p>
        <Image
          src="/icons/ic-arrow-right.svg"
          alt="icon-right"
          height={15}
          width={15}
        />
      </div>
    </div>
  );
};
