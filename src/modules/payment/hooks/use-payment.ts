"use client";

import { useEffect, useState } from "react";
import { getPayment} from "../services/get-payment";
import { PaymentData } from "../types/payment";

export function usePayment(orderId: string) {
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPayment = async () => {
    setLoading(true);

    const data = await getPayment(orderId);
    setPayment(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchPayment();
  }, [orderId]);

  return {
    payment,
    loading,
    reload: fetchPayment,
  };
}
