import crypto from "crypto";
import { PaymentRequest } from "@/modules/payment/types/payment";
import { DonationIPFS } from "../types/donation-ipfs";

export function buildDonationIPFSPayload(
  payment: PaymentRequest,
  blockchainTxHash: string
): DonationIPFS {
  const donationHash = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        reference_id: payment.reference_id,
        payment_request_id: payment.payment_request_id,
        amount: payment.request_amount,
        user_id: payment.metadata.user_id,
      })
    )
    .digest("hex");

  return {
    version: "1.0",
    donation: {
      reference_id: payment.reference_id,
      payment_request_id: payment.payment_request_id,
      order_id: payment.metadata.order_id,

      campaign_id: payment.metadata.campaign_id,
      amount: payment.request_amount,
      currency: payment.currency,

      channel: payment.channel_code,
      status: "SUCCEEDED",

      created_at: payment.created,
      paid_at: payment.updated,
    },
    donor: {
      user_id: payment.metadata.user_id,
      username: payment.metadata.username,
      email: payment.metadata.email,
      message: payment.metadata.message,
      is_anonymous: payment.metadata.is_anonymous
    },
    proof: {
      donation_hash: donationHash,
      blockchain_tx_hash: blockchainTxHash,
    },
  };
}
