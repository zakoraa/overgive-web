"use client";

import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CampaignTitleCardProps {
  title: string;
  count: number;
  isShowAll?: boolean;
  href: string;
}

export const CampaignTitleCard = ({
  title,
  count,
  href,
  isShowAll = true,
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
      {isShowAll && (
        <Link
          className="text-primary-dark flex cursor-pointer items-center space-x-1 text-sm font-bold"
          href={href}
        >
          <p>Lihat semua</p>
          <Image
            src="/icons/ic-arrow-right.svg"
            alt="icon-right"
            height={15}
            width={15}
          />
        </Link>
      )}
    </div>
  );
};
