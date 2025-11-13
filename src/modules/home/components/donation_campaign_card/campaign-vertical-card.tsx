import { Label } from "@/components/text/label";
import { Card } from "@/components/ui/card";
import { DonationProgressIndicator } from "@/components/ui/donation-progress-indicator";

export const CampaignVerticalCard = () => {
  const percentage = 65;
  return (
    <Card className="hover:bg-hover mt-3 flex h-64 w-40 cursor-pointer flex-col transition-colors duration-300">
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={60}
        width={200}
        alt="campaign-image"
        className="h-full rounded-t-2xl object-cover"
      />
      <div className="m-3 flex flex-col justify-between">
        <Label
          size="sm"
          className="text-start font-bold"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <div className="space-y-1">
          <p className="text-[10px]">
            Terkumpul{"  "}
            <span className="text-primary font-black">
              Rp 200.000.000
            </span>
          </p>
          <DonationProgressIndicator percentage={percentage} className="h-1" />
          <p className="mt-3 text-end text-[10px]">
            Target Donasi{"  "}
            <span className="font-black">Rp 1.000.000.000</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
