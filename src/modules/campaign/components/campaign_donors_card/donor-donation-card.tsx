import { Card } from "@/core/components/ui/card";
import { formatRupiah } from "@/core/utils/currency";
import { timeAgo } from "@/core/utils/date";
import { useRouter } from "next/navigation";
import { DonationWithBlockchain } from "@/modules/donation/services/get-donation-by-id";
import { useVerifyDonation } from "@/modules/donation/hooks/use-verify-donation";
import { CheckCircle, XCircle } from "lucide-react";
import { useDonationBlockchain } from "@/modules/donation/hooks/use-donation-blockchain";
import { VerificationStatus } from "@/core/components/ui/verification-status";

interface DonorDonationCardProps {
  donation: DonationWithBlockchain;
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
      className="hover:bg-hover transition-color flex h-fit cursor-pointer flex-col px-3 py-2 duration-300"
    >
      <h3 className="text-start font-bold">{donorName}</h3>

      <div className="space-y-1">
        <p className="text-sm">
          Berdonasi sebesar{" "}
          <span className="font-black">{formatRupiah(amount)}</span>
        </p>

        <p className="line-clamp-2 text-xs text-gray-500">{message}</p>
        <div className="flex justify-between">
          <VerificationStatus donation={donation} />
          <p className="text-end text-xs text-gray-500">{timeAgo(createdAt)}</p>
        </div>
      </div>
    </Card>
  );
};
