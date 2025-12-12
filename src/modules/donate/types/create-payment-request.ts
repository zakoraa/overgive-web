export interface CreateQrisPayload {
  amount: number;
  external_id: string;
  description?: string;
  metadata?: Record<string, any>;  
}

export interface QrisResponse {
  id: string;
  external_id: string;
  amount: number;
  qr_string: string;
  callback_url: string;
  description: string;
  type: string;
  status: string;
  created: string;
  updated: string;
  metadata: Record<string, any> | null;
}
