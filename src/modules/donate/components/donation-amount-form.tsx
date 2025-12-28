"use client";

import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import { useCampaignDetailContext } from "@/modules/campaign/providers/campaign-detail-provider";
import { DonationAmountInput } from "./ui/donation-amount-input";
import { useDonateForm } from "../providers/donate-form-provider";

export const DonationAmountForm = () => {
  const { campaign } = useCampaignDetailContext();
  const { values, errors, setField } = useDonateForm();

  return (
    <Card className="w-full items-start rounded-t-none px-3 pt-4 pb-5">
      <h1 className="text-xl font-bold">Donasi untuk {campaign?.title}</h1>
      <Line />
      <DonationAmountInput
        value={values.amount}
        onChange={(v) => setField("amount", v)}
        min={10000}
        error={errors.amount}
        helperText="Minimal donasi Rp 10.000"
      />
      <div className="mt-3 rounded-md bg-blue-100 p-3 text-sm">
        Total donasi yang terkumpul pada kampanye ini akan dipotong maksimal{" "}
        <span className="font-bold">10%</span> untuk biaya operasional Yayasan
        Overgive.
      </div>
    </Card>
  );
};
