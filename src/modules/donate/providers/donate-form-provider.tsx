"use client";

import { createContext, useContext, useState } from "react";
import { useCreatePayment } from "../hooks/use-create-payment";

const MAX_AMOUNT = 999_999_999;

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

  submit: () => Promise<any>;
}

const DonateFormContext = createContext<DonateFormContextValue | null>(null);

export const DonateFormProvider = ({
  children,
}: {
  children: React.ReactNode;
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
          amount: "Maksimal donasi Rp 999.999.999",
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

  const submit = async () => {
    setSubmitError(null);

    // VALIDASI FORM → jangan isi submitError
    if (!validate()) return null;

    const external_id = "donation_" + Date.now();

    const payload = {
      amount: values.amount,
      external_id,
      description: values.message || "Donation Payment",
      metadata: {
        name: values.name,
        email: values.email,
        message: values.message,
        isAnonymous: values.isAnonymous,
      },
    };

    const res = await createPayment(payload);

    if (!res.success) {
      // Hanya error dari createPayment
      setSubmitError("Gagal membuat pembayaran");
      return null;
    }

    return res.data; // sukses
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
