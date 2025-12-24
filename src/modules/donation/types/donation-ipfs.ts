export interface DonationIPFS {
  version: "1.0";

  donation: {
    reference_id: string;
    payment_request_id: string;
    order_id: string;

    campaign_id: string;
    amount: number;
    currency: string;

    channel: string;
    status: "SUCCEEDED";

    paid_at: string;
    created_at: string;
  };

  donor: {
    user_id: string;
    username: string;
    email: string;
    message?: string;
    is_anonymous: boolean;
  };

  proof: {
    donation_hash: string;        
    blockchain_tx_hash: string;   
  };
}
