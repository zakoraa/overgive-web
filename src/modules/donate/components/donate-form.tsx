"use client";

import { DonateFormProvider } from "../providers/donate-form-provider";
import { DonationAmountForm } from "./donation-amount-form";
import { DonationMessageForm } from "./donation-message-form";
import { PersonalDataForm } from "./personal-data-form";
import { DonateButton } from "./ui/donate-button";

export const DonateForm = () => {
  return (
    <DonateFormProvider>
      <form
        className="space-y-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <DonationAmountForm />
        <PersonalDataForm />
        <DonationMessageForm />
        <DonateButton />
      </form>
    </DonateFormProvider>
  );
};
