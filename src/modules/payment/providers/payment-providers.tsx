"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getPayment } from "../services/get-payment";
import { PaymentData } from "../types/payment";

interface PaymentContextType {
  payment: PaymentData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType>({
  payment: null,
  loading: true,
  reload: async () => {},
});

export const usePaymentContext = () => useContext(PaymentContext);

export function PaymentProvider({
  orderId,
  children,
}: {
  orderId: string;
  children: React.ReactNode;
}) {
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getPayment(orderId);
    setPayment(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [orderId]);

  return (
    <PaymentContext.Provider value={{ payment, loading, reload: load }}>
      {children}
    </PaymentContext.Provider>
  );
}
