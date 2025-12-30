import { useDonationBlockchain } from "@/modules/donation/hooks/use-donation-blockchain";
import { useVerifyDonation } from "@/modules/donation/hooks/use-verify-donation";
import { DonationWithBlockchain } from "@/modules/donation/services/get-donation-by-id";
import { CheckCircle, XCircle } from "lucide-react";

export const VerificationStatus = ({
  donation,
}: {
  donation: DonationWithBlockchain;
}) => {
  const { data: input, isLoading: loadingBlockchain } = useDonationBlockchain(
    donation.blockchain_tx_hash ?? undefined,
  );

  const { isValid, loading } = useVerifyDonation(donation, input);

  if (loadingBlockchain || loading) {
    return <p className="text-xs text-orange-400">Sedang memverifikasi...</p>;
  }

  if (isValid) {
    return (
      <div className="flex items-start space-x-2 text-xs text-green-500">
        <CheckCircle className="h-4 w-4" />
        <p>Terverifikasi</p>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-2 text-xs text-red-500">
      <XCircle className="h-4 w-4" />
      <p>Data telah dimanipulasi</p>
    </div>
  );
};
