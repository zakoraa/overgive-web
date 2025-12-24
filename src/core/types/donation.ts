import { Campaign } from "@/core/types/campaign";

export interface Donation {
  id: string;
  user_id?: string | null;
  username?: string | null;
  user_email?: string | null;
  is_anonymous?: boolean;

  campaign_id: string;
  campaign: Campaign; 

  amount: number;
  currency?: string;
  donation_message?: string | null;

  xendit_reference_id?: string | null;
  donation_hash?: string | null;
  blockchain_tx_hash?: string | null;

  created_at: string;
}
