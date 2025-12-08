"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { DonationProgressIndicator } from "@/core/components/ui/donation-progress-indicator";

export const CampaignVerticalCard = () => {
  const router = useRouter();
  const percentage = 65;

  return (
    <Card
      onClick={() => router.push("/campaign")}
      className="hover:bg-hover mt-3 flex h-fit max-w-52 cursor-pointer flex-col transition-colors duration-300"
    >
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={60}
        width={250}
        alt="campaign-image"
        className="min-h-full min-w-full rounded-t-2xl object-cover"
      />
      <div className="m-3 flex flex-col justify-between space-y-2">
        <Label
          size="md"
          className="text-start font-bold"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <div className="space-y-1">
          <p className="text-[12px]">
            Terkumpul{"  "}
            <span className="text-primary font-black">Rp 200.000.000</span>
          </p>
          <DonationProgressIndicator percentage={percentage} />
          <p className="mt-3 text-end text-[11px]">
            Target Donasi{"  "}
            <span className="font-black">Rp 1.000.000.000</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
