"use client";

import { createContext, useContext, useState } from "react";
import { useCreatePayment } from "../hooks/use-create-payment";
import { PaymentRequestResponse } from "../types/create-payment-request";

const MAX_AMOUNT = 10_000_000;

interface DonateFormValues {
  amount: number;
  name: string;
  email: string;
  message: string;
  isAnonymous: boolean;
}

interface DonateFormErrors {
  amount?: string;
  name?: string;
  email?: string;
  message?: string;
}

interface DonateFormContextValue {
  values: DonateFormValues;
  errors: DonateFormErrors;
  loading: boolean;
  submitError: string | null;

  setField: <K extends keyof DonateFormValues>(
    field: K,
    value: DonateFormValues[K],
  ) => void;

  submit: () => Promise<PaymentRequestResponse | null>;
}

const DonateFormContext = createContext<DonateFormContextValue | null>(null);

export const DonateFormProvider = ({
  children,
  campaignId, // tambahkan campaignId sebagai prop
  userId,
}: {
  children: React.ReactNode;
  campaignId: string;
  userId?: string | null | undefined;
}) => {
  const [values, setValues] = useState<DonateFormValues>({
    amount: 0,
    name: "",
    email: "",
    message: "",
    isAnonymous: true,
  });

  const [errors, setErrors] = useState<DonateFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { loading, serverError, createPayment } = useCreatePayment();

  const setField = (field: keyof DonateFormValues, value: any) => {
    if (field === "amount") {
      const numeric = Number(value) || 0;

      if (numeric > MAX_AMOUNT) {
        setValues((prev) => ({ ...prev, amount: 0 }));
        setErrors((prev) => ({
          ...prev,
          amount: "Maksimal donasi Rp 10.000.000",
        }));
        return;
      }
    }

    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: DonateFormErrors = {};

    if (!values.amount || values.amount < 10000) {
      newErrors.amount = "Minimal donasi Rp 10.000";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!values.name.trim()) {
      newErrors.name = "Nama wajib diisi";
    }

    if (values.message.length > 300) {
      newErrors.message = "Maksimal 300 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (): Promise<PaymentRequestResponse | null> => {
    setSubmitError(null);

    if (!validate()) return null;

    const payload = {
      amount: values.amount,
      reference_id: `donation_${Date.now()}`,
      description: "QRIS Donation",
      metadata: {
        user_id: userId,
        campaign_id: campaignId,
        username: values.name,
        email: values.email,
        message: values.message,
        is_anonymous: values.isAnonymous,
      },
    };

    const res = await createPayment(payload);

    if (!res.success) {
      setSubmitError("Gagal membuat pembayaran");
      return null;
    }

    return res.data as PaymentRequestResponse;
  };

  return (
    <DonateFormContext.Provider
      value={{
        values,
        errors,
        loading,
        submitError,
        setField,
        submit,
      }}
    >
      {children}
    </DonateFormContext.Provider>
  );
};

export const useDonateForm = () => {
  const ctx = useContext(DonateFormContext);
  if (!ctx) {
    throw new Error("useDonateForm harus digunakan dalam DonateFormProvider");
  }
  return ctx;
};
