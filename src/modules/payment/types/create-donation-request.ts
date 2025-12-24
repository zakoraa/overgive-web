export interface CreateDonationRequest {
  user_id?: string;
  username?: string;
  user_email?: string;
  is_anonymous?: boolean;
  campaign_id: string;
  amount: number;
  currency?: string;
  xendit_reference_id?: string;
  donation_message?: string;
  donation_hash?: string;
  blockchain_tx_hash?: string;
}