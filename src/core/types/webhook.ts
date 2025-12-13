export interface XenditPaymentWebhook {
  event: "payment.capture" | "payment.authorization" | "payment.failure";
  business_id: string;
  created: string;

  data: {
    payment_id: string;
    payment_request_id: string;
    reference_id: string;

    status:
      | "AUTHORIZED"
      | "CANCELED"
      | "SUCCEEDED"
      | "FAILED"
      | "EXPIRED"
      | "PENDING";

    channel_code: string;
    request_amount: number;
    currency: string;

    failure_code?: string;

    metadata?: Record<string, any>;

    created: string;
    updated: string;
  };
}
