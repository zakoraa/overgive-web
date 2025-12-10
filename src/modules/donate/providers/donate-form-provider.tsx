"use client";

import { createContext, useContext, useState } from "react";
import { DonateFormValues, DonateFormErrors } from "../types/donate-form";

const MAX_AMOUNT = 999_999_999;

interface DonateFormContextValue {
  values: DonateFormValues;
  errors: DonateFormErrors;

  setField: <K extends keyof DonateFormValues>(
    field: K,
    value: DonateFormValues[K],
  ) => void;

  validate: () => boolean;
  submit: () => void;
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
    isAnonymous: true,
    message: "",
  });

  const [errors, setErrors] = useState<DonateFormErrors>({});

  /**
   * ✅ SET FIELD (dengan guard amount)
   */
  const setField = (field: keyof DonateFormValues, value: any) => {
    // 🔴 HARD LIMIT AMOUNT
    if (field === "amount") {
      const numeric = Number(value) || 0;

      if (numeric > MAX_AMOUNT) {
        setValues((prev) => ({
          ...prev,
          amount: 0,
        }));

        setErrors((prev) => ({
          ...prev,
          amount: "Maksimal donasi Rp 999.999.999",
        }));

        return;
      }
    }

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  /**
   * ✅ VALIDASI FORM
   */
  const validate = () => {
    const newErrors: DonateFormErrors = {};

    if (!values.amount || values.amount < 10_000) {
      newErrors.amount = "Minimal donasi Rp 10.000";
    }

    if (values.amount > MAX_AMOUNT) {
      newErrors.amount = "Maksimal donasi Rp 999.999.999";
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

  /**
   * ✅ SUBMIT
   */
  const submit = () => {
    if (!validate()) return;

    const payload = {
      amount: values.amount,
      email: values.email,
      message: values.message || null,

      internalName: values.name || null,
      displayName: values.isAnonymous ? "Anonim" : values.name || "Anonim",

      isAnonymous: values.isAnonymous,
    };

    console.log("SUBMIT DONASI:", payload);

    // TODO: API, payment gateway, analytics
  };

  return (
    <DonateFormContext.Provider
      value={{
        values,
        errors,
        setField,
        validate,
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
    throw new Error(
      "useDonateForm harus digunakan di dalam DonateFormProvider",
    );
  }
  return ctx;
};
