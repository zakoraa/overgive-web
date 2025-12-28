import { Card } from "@/core/components/ui/card";
import { formatRupiah } from "@/core/utils/currency";
import { timeAgo } from "@/core/utils/date";
import { useRouter } from "next/navigation";
import { DonationWithBlockchain } from "@/modules/donation/services/get-donation-by-id";
import { useVerifyDonation } from "@/modules/donation/hooks/use-verify-donation";
import { CheckCircle, XCircle } from "lucide-react";

interface DonorDonationCardProps {
  donation: DonationWithBlockchain;
}

export const DonorDonationCard = ({ donation }: DonorDonationCardProps) => {
  const { isValid, loading: isVerifying } = useVerifyDonation(donation);

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
          {isVerifying ? (
            <p>Sedang memverifikasi...</p>
          ) : isValid ? (
            <div className="flex items-start space-x-2 text-xs text-green-500">
              <CheckCircle className="h-4 w-4" /> <p>Terverifikasi</p>
            </div>
          ) : (
            <div className="flex items-start space-x-2 text-xs text-red-500">
              <XCircle className="h-4 w-4" />{" "}
              <p>Data telah dimanipulasi (tidak sesuai blockchain)</p>
            </div>
          )}
          <p className="text-end text-xs text-gray-500">{timeAgo(createdAt)}</p>
        </div>
      </div>
    </Card>
  );
};
