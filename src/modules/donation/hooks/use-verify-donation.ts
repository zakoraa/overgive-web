import { useEffect, useState } from "react";
import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { DonationWithBlockchain } from "../services/get-donation-by-id";
import { extractDonationHashFromInput } from "../utils/extract-donation-hash-from-input";

export function useVerifyDonation(
  donation: DonationWithBlockchain | null,
  blockchainInput?: string | null
) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (
      !donation ||
      !donation.blockchain_tx_hash ||
      !blockchainInput ||
      isValid !== null
    ) {
      return;
    }

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

    const blockchainHash =
      extractDonationHashFromInput(blockchainInput);

    setIsValid(regeneratedHash === blockchainHash);
  }, [donation?.id, blockchainInput]); 

  return {
    isValid,
    loading: isValid === null,
  };
}
