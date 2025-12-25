import { Label } from "@/core/components/text/label";
import { Card } from "@/core/components/ui/card";
import { Donation } from "@/modules/donation/types/donation";
import { formatRupiah } from "@/core/utils/currency";
import { timeAgo } from "@/core/utils/date";
import { useRouter } from "next/navigation";

interface DonorDonationCardProps {
  donation: Donation;
}

export const DonorDonationCard = ({ donation }: DonorDonationCardProps) => {
  const isAnonymous = donation.is_anonymous;
  const donorName = isAnonymous
    ? "Donatur Baik"
    : (donation.username ?? "Donatur");

  const amount = donation.amount;
  const createdAt = donation.created_at;
  const message = donation.donation_message;
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/donation/${donation.id}`)}
      className="cursor-pointer hover:bg-hover transition-color duration-300 flex h-fit flex-col px-3 py-2"
    >
      <h3 className="text-start font-bold">{donorName}</h3>

      <div className="space-y-1">
        <p className="text-sm">
          Berdonasi sebesar{" "}
          <span className="font-black">{formatRupiah(amount)}</span>
        </p>

        <p className="line-clamp-2 text-xs text-gray-500">{message}</p>
        <p className="text-end text-xs text-gray-500">{timeAgo(createdAt)}</p>
      </div>
    </Card>
  );
};
