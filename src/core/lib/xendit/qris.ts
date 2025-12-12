
import { CreateQrisPayload, QrisResponse } from "@/modules/donate/types/create-payment-request";
import { xenditRequest } from "./xendit";


export const QrisService = {
  createQris: async (payload: CreateQrisPayload): Promise<QrisResponse> => {
    return await xenditRequest("/qr_codes", {
      method: "POST",
      body: JSON.stringify({
        type: "DYNAMIC",
        amount: payload.amount,
        currency: "IDR",
        external_id: payload.external_id,
        description: payload.description ?? "QRIS Payment Test",
        callback_url: `${process.env.BASE_URL}/api/xendit/callback`,
        metadata: payload.metadata ?? {}, 
      }),
    });
  },
};
