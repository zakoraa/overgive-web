import { Label } from "@/components/text/label";
import { Card } from "@/components/ui/card";

export const MyDonationCard = () => {
  return (
    <Card className="hover:bg-hover flex h-24 cursor-pointer transition-colors duration-300">
      <img
        src={
          "https://www.jagaindonesia.com/wp-content/uploads/2023/03/Papua.jpg"
        }
        height={100}
        width={100}
        alt="campaign-image"
        className="h-full rounded-s-2xl object-cover"
      />
      <div className="m-3 flex flex-col justify-between w-full">
        <Label
          size="md"
          className="text-start"
          text="Bantuan Pembangunan Sekolah Di Papua"
        />
        <div className="space-y-1">
          <p className="text-sm">
            Berdonasi sebesar{"  "}
            <span className="font-black">Rp 50.000</span>
          </p>
          <p className="mt-3 text-end text-xs text-gray-500">15 menit lalu</p>
        </div>
      </div>
    </Card>
  );
};
