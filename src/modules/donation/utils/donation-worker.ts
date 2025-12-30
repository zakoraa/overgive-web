import { generateDonationHash } from "@/core/lib/generate-donation-hash";
import { DonationWithBlockchain } from "@/modules/donation/services/get-donation-by-id";
import { extractDonationHashFromInput } from "@/modules/donation/utils/extract-donation-hash-from-input";

export type DonationWorkerMessage = {
  donation: DonationWithBlockchain;
  blockchainInput: string;
};

self.onmessage = (e: MessageEvent<DonationWorkerMessage>) => {
  const { donation, blockchainInput } = e.data;

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

  const blockchainHash = extractDonationHashFromInput(blockchainInput);

  self.postMessage(regeneratedHash === blockchainHash);
};
