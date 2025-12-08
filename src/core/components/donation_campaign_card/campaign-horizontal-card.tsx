"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { DonationProgressIndicator } from "@/core/components/ui/donation-progress-indicator";

export const CampaignHorizontalCard = () => {
  const router = useRouter();
  const percentage = 65;

  return (
    <Card
      onClick={() => router.push("/campaign")}
      className="hover:bg-hover flex h-fit cursor-pointer transition-colors duration-300"
    >
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={200}
        alt="campaign-image"
        className="min-h-full w-[100px] rounded-s-2xl object-cover lg:w-[200px]"
      />
      <div className="m-3 flex flex-col justify-between">
        <Label
          size="md"
          className="text-start"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <div className="space-y-1">
          <p className="text-xs">
            Terkumpul{"  "}
            <span className="text-primary font-black">Rp 200.000.000</span>
          </p>
          <DonationProgressIndicator percentage={percentage} />
          <p className="mt-3 text-end text-xs">
            Target Donasi{"  "}
            <span className="font-black">Rp 1.000.000.000</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
