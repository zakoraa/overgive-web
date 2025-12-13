export interface PaymentRequestResponse {
  // Identitas
  payment_request_id: string;
  reference_id: string;
  business_id: string;

  // Status & tipe
  status:
    | "ACCEPTING_PAYMENTS"
    | "REQUIRES_ACTION"
    | "AUTHORIZED"
    | "CANCELED"
    | "EXPIRED"
    | "SUCCEEDED"
    | "FAILED";

  type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";

  // Payment info
  country: "ID" | "PH" | "VN" | "TH" | "SG" | "MY";
  currency: "IDR" | "PHP" | "VND" | "THB" | "SGD" | "MYR" | "USD";
  request_amount: number;
  capture_method: "AUTOMATIC" | "MANUAL";

  // Channel
  channel_code: string; // contoh: "QRIS"
  channel_properties?: PaymentRequestChannelProperties;

  // Actions (QR ada di sini)
  actions: PaymentRequestAction[];

  // Optional fields
  description?: string;
  metadata?: PaymentRequestMetadata;
  failure_code?: string;

  // Timestamp
  created: string;
  updated: string;
}

export interface PaymentRequestAction {
  type: "PRESENT_TO_CUSTOMER" | string;
  descriptor: "QR_STRING" | string;
  value: string;
}

export interface PaymentRequestChannelProperties {
  expires_at?: string; // ISO date
}

export interface PaymentRequestMetadata {
  [key: string]: any;
}


export interface PaymentAction {
  type: string;
  descriptor: string;
  value: string;
}

export interface PaymentRequest {
  payment_request_id: string;
  reference_id: string;
  status:
    | "ACCEPTING_PAYMENTS"
    | "REQUIRES_ACTION"
    | "AUTHORIZED"
    | "SUCCEEDED"
    | "FAILED"
    | "EXPIRED"
    | "CANCELED";

  request_amount: number;
  currency: string;
  channel_code: string;

  actions?: PaymentAction[];

  created: string;
  updated: string;
}
