import { Label } from "@/components/text/label";
import { Card } from "@/components/ui/card";

export const DonorDonationCard = () => {
  return (
    <Card className="flex h-22 flex-col p-3">
      <Label size="md" className="text-start" text="Donatur Baik" />
      <div className="space-y-1">
        <p className="text-sm">
          Berdonasi sebesar{"  "}
          <span className="font-black">Rp 50.000</span>
        </p>
        <p className="text-end text-xs text-gray-500">15 menit lalu</p>
      </div>
    </Card>
  );
};
