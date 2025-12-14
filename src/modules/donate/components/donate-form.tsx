"use client";

import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { DonateFormProvider } from "../providers/donate-form-provider";
import { DonationAmountForm } from "./donation-amount-form";
import { DonationMessageForm } from "./donation-message-form";
import { PersonalDataForm } from "./personal-data-form";
import { DonateButton } from "./ui/donate-button";

interface DonateFormProps {
  campaignId: string;
}

export const DonateForm = ({ campaignId }: DonateFormProps) => {
  const { user } = useGetCurrentUserContext();
  return (
    <DonateFormProvider campaignId={campaignId} userId={user?.id}>
      <form className="space-y-1" onSubmit={(e) => e.preventDefault()}>
        <DonationAmountForm />
        <PersonalDataForm />
        <DonationMessageForm />
        <DonateButton />
      </form>
    </DonateFormProvider>
  );
};
