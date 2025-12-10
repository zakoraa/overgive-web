"use client";

import { Card } from "@/core/components/ui/card";
import { AppInput } from "@/core/components/input/app-input";
import { AnonymousDonationToggle } from "./ui/anonymous-donation-toggle";
import { useDonateForm } from "../providers/donate-form-provider";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { useEffect } from "react";

export const PersonalDataForm = () => {
  const { values, errors, setField } = useDonateForm();
  const { user, loading } = useGetCurrentUserContext();

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (!values.name && user.fullName) {
      setField("name", user.fullName);
    }

    if (!values.email && user.email) {
      setField("email", user.email);
    }
  }, [user, loading]);

  return (
    <Card className="w-full items-start space-y-3 px-3 pt-4 pb-5">
      <AppInput
        label="Nama"
        hint="Masukkan nama Anda"
        value={values.name}
        error={errors.name}
        onChange={(e) => setField("name", e.target.value)}
      />

      <AppInput
        label="Email"
        hint="Masukkan email Anda"
        value={values.email}
        error={errors.email}
        onChange={(e) => setField("email", e.target.value)}
      />

      <AnonymousDonationToggle
        value={values.isAnonymous}
        onChange={(v) => setField("isAnonymous", v)}
      />
    </Card>
  );
};
