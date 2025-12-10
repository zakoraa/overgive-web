"use client";
import { Card } from "@/core/components/ui/card";
import { useState } from "react";
import { DonationMessageInput } from "./ui/donation-message-input";
import { useDonateForm } from "../providers/donate-form-provider";

export const DonationMessageForm = () => {
  const { values, errors, setField } = useDonateForm();
  return (
    <Card className="w-full items-start space-y-3 px-3 pt-4 pb-14">
      <DonationMessageInput
        value={values.message}
        onChange={(v) => setField("message", v)}
        error={errors.message}
      />
    </Card>
  );
};
