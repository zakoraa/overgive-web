export interface CreateQrisPayload {
  amount: number;
  // external_id: string;
  // description?: string;
  // metadata?: Record<string, any>;  
}

export interface PaymentRequestAction {
  type: "PRESENT_TO_CUSTOMER";
  descriptor: "QR_STRING";
  value: string;
}

export interface PaymentRequestResponse {
  payment_request_id: string;
  reference_id: string;
  status:
    | "REQUIRES_ACTION"
    | "ACCEPTING_PAYMENTS"
    | "SUCCEEDED"
    | "FAILED"
    | "EXPIRED";

  request_amount: number;
  currency: "IDR";
  channel_code: "QRIS";

  actions: PaymentRequestAction[];

  created: string;
  updated: string;
}
