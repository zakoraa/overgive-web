import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { DonationIPFS } from "@/core/types/donation-ipfs";
import { formatRupiah } from "@/core/utils/currency";

interface DonorDonationCardProps {
  donation: DonationIPFS;
}

export const DonorDonationCard = ({ donation }: DonorDonationCardProps) => {
  const isAnonymous = donation.donor?.is_anonymous;
  const donorName = isAnonymous
    ? "Donatur Baik"
    : (donation.donor?.username ?? "Donatur");

  const amount = donation.donation.amount;
  const createdAt = donation.donation.created_at;

  const minutesAgo = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 60000,
  );

  return (
    <Card className="flex h-22 flex-col p-3">
      <Label size="md" className="text-start" text={donorName} />

      <div className="space-y-1">
        <p className="text-sm">
          Berdonasi sebesar{" "}
          <span className="font-black">{formatRupiah(amount)}</span>
        </p>

        <p className="text-end text-xs text-gray-500">
          {minutesAgo <= 0 ? "Baru saja" : `${minutesAgo} menit lalu`}
        </p>
      </div>
    </Card>
  );
};
