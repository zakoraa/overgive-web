"use client";

import { useMutation } from "@tanstack/react-query";
import { createPaymentRequestAction } from "../services/create-payment-request";
import { CreateQrisPayload } from "../types/create-payment-request";

export function useCreatePayment() {
  const mutation = useMutation({
    mutationFn: (payload: CreateQrisPayload) =>
      createPaymentRequestAction(payload),

    onError: (error: any) => {
      console.error(error);
    },
  });

  return {
    createPayment: mutation.mutateAsync,
    loading: mutation.isPending,
    serverError:
      mutation.isError
        ? mutation.error?.message ?? "Terjadi kesalahan server"
        : null,
    data: mutation.data,
    success: mutation.data?.success === true,
  };
}
