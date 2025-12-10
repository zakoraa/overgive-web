"use client";

import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { DonationProgressIndicator } from "@/core/components/ui/donation-progress-indicator";
import { cn } from "@/core/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCampaignDetailContext } from "../providers/campaign-detail-provider";
import { Label } from "@/core/components/text/label";
import { CampaignCategory } from "@/core/types/campaign-category";
import { categoryDisplay, getCampaignStatusInfo } from "../utils/campaign-util";
import { formatRupiah } from "@/core/utils/currency";
import { getDonationPercentage } from "@/core/utils/util";
import { formatDate } from "@/core/utils/date";

interface Item {
  icon: string;
  text: string;
  href: string;
}

const items: (Item | null)[] = [
  {
    icon: "/icons/ic-donor.svg",
    text: "1000 donatur",
    href: "/donatur",
  },
  null,
  {
    icon: "/icons/ic-latest-news.svg",
    text: "Kabar terbaru",
    href: "/kabar-terbaru",
  },
  null,
  {
    icon: "/icons/ic-details-of-fund.svg",
    text: "Penggunaan dana",
    href: "/rincian-dana",
  },
];

export const CampaignHeaderCard = () => {
  const { campaign } = useCampaignDetailContext();
  return (
    <Card className="w-full items-start rounded-t-none pb-5">
      <img
        src={campaign?.imageUrl}
        height={100}
        width={200}
        alt="campaign-image"
        className="h-60 w-full object-cover"
      />
      <div className="mt-3 w-full px-5">
        <Title className="font-black" text={campaign?.title} />
        <Label
          className="font-normal"
          text={`Kategori: ${categoryDisplay[campaign?.category as CampaignCategory]}`}
        />
        <div className="mt-3 flex gap-x-1">
          {!campaign?.targetAmount && <Title size="sm" text="Terkumpul " />}
          <Title
            size="sm"
            text={`${formatRupiah(campaign?.collectedAmount ?? 0)}`}
            className="text-primary"
          />
        </div>
        {campaign?.targetAmount && (
          <DonationProgressIndicator
            percentage={getDonationPercentage(
              campaign?.collectedAmount ?? 0,
              campaign?.targetAmount ?? 0,
            )}
            className="mb-3"
          />
        )}
        <div className="flex items-center justify-between">
          {campaign?.targetAmount && (
            <p className="text-sm">
              Target donasi{" "}
              <span className="font-black">
                {formatRupiah(campaign?.targetAmount ?? 0)}
              </span>
            </p>
          )}
          {campaign?.endedAt && campaign?.status === "active" && (
            <p className={"text-xs text-orange-400"}>
              Selesai pada {formatDate(campaign?.endedAt)}
            </p>
          )}
        </div>
        <div className="mt-5 flex items-center justify-between text-xs">
          <Card
            className={cn(
              "w-auto! px-3 py-1",
              getCampaignStatusInfo(campaign?.status, campaign?.endedAt)
                .colorClass,
            )}
          >
            {getCampaignStatusInfo(campaign?.status, campaign?.endedAt).label}
          </Card>
          <p className="">Dibuat pada {formatDate(campaign?.createdAt)}</p>
        </div>
        <div className="mt-5 flex w-full items-center justify-between px-10">
          {items.map((item, index) => (
            <div key={index}>
              {item === null ? (
                <div
                  className={cn(
                    "h-6 w-px",
                    index > 0 ? "bg-gray-300" : "bg-transparent",
                  )}
                />
              ) : (
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center space-y-1"
                >
                  <Image
                    src={item.icon}
                    alt={item.text}
                    height={25}
                    width={25}
                  />
                  <p className="text-center text-xs">{item.text}</p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
