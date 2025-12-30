"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPayment } from "../services/get-payment";
import { PaymentRequest } from "../types/payment";

interface PaymentContextType {
  payment: PaymentRequest | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePaymentContext = () => {
  const ctx = useContext(PaymentContext);
  if (!ctx)
    throw new Error("usePaymentContext must be used within PaymentProvider");
  return ctx;
};

export function PaymentProvider({
  orderId,
  children,
}: {
  orderId: string;
  children: ReactNode;
}) {
  const { data, isLoading, refetch, isError, error } = useQuery<PaymentRequest>(
    {
      queryKey: ["payment", orderId],
      queryFn: () => getPayment(orderId),
      enabled: !!orderId,
      staleTime: 1000 * 60,
    },
  );

  return (
    <PaymentContext.Provider
      value={{
        payment: data ?? null,
        loading: isLoading,
        error: isError ? (error as Error).message : null,
        reload: refetch,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
