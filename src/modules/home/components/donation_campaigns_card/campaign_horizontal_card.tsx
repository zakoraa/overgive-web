import { Label } from "@/components/text/label";
import { Card } from "@/components/ui/card";

export const CampaignCard = () => {
  const percentage = 65;
  return (
    <Card className="mt-5 flex h-32 cursor-pointer transition-colors duration-300 hover:bg-blue-100">
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={200}
        alt="campaign-image"
        className="h-full rounded-s-2xl object-cover"
      />
      <div className="m-3 flex flex-col justify-between">
        <Label
          size="lg"
          className="text-start"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <div className="space-y-1">
          <p className="text-sm">
            Terkumpul{"  "}
            <span className="text-primary-light font-black">
              Rp 200.000.000
            </span>
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="bg-primary-light h-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="mt-3 text-end text-xs">
            Target Donasi{"  "}
            <span className="font-black">Rp 1.000.000.000</span>
          </p>
        </div>
      </div>
    </Card>
  );
};
