import { Title } from "@/components/text/title";
import { Card } from "@/components/ui/card";
import { DonationProgressIndicator } from "@/components/ui/donation-progress-indicator";
import BasePage from "@/layout/base-page";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <Card className="items-start rounded-t-none w-full pb-5">
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={200}
        alt="campaign-image"
        className="h-60 w-full object-cover"
      />
      <div className="w-full px-5 mt-3">
        <Title
          className="font-black"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <Title size="sm" text="Rp 20.000.000" className="text-primary mt-3" />
        <DonationProgressIndicator percentage={20} className="mb-3" />
        <div className="flex items-center justify-between">
          <p className="text-sm">
            Target donasi <span className="font-black">Rp 1.000.000.000</span>
          </p>
          <p className="text-xs">100 hari lagi</p>
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
