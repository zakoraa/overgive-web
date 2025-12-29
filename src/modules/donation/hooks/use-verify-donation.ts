import { useEffect, useState } from "react";
import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { DonationWithBlockchain } from "../services/get-donation-by-id";
import { extractDonationHashFromInput } from "../utils/extract-donation-hash-from-input";

export function useVerifyDonation(
  donation: DonationWithBlockchain | null,
  blockchainInput: string | null 
) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!donation || !donation.blockchain_tx_hash || !blockchainInput) return;

    const verify = async () => {
      setLoading(true);

      const regeneratedHash = generateDonationHash({
        user_id: donation.user_id,
        username: donation.username,
        user_email: donation.user_email,
        campaign_id: donation.campaign_id,
        amount: donation.amount,
        currency: donation.currency,
        donation_message: donation.donation_message,
        xendit_reference_id: donation.xendit_reference_id,
      });
    if(!blockchainInput){
      setLoading(false);
      setIsValid(false);
      return;
    }
      const blockchainHash = extractDonationHashFromInput(blockchainInput);

      setIsValid(regeneratedHash === blockchainHash);
      setLoading(false);
    };

    verify();
  }, [donation, blockchainInput]);

  return {
    isValid,
    loading,
  };
}
