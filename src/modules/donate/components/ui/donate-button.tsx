"use client";

import { ChevronDown } from "lucide-react";
import BasePage from "@/core/layout/base-page";
import { AppButton } from "@/core/components/button/app-button";
import { useDonateForm } from "../../providers/donate-form-provider";
import { formatRupiah } from "@/core/utils/currency";

export const DonateButton = () => {
  const { submit, values } = useDonateForm();

  return (
    <BasePage className="fixed bottom-0 h-18 w-full pt-2 pb-2!">
      <div className="flex w-full items-center justify-between gap-2 px-3">
        {/* Total Donasi */}
        <div className="flex flex-col text-center">
          <span className="text-xs font-semibold text-gray-500">
            Total Donasi
          </span>

          <p className="text-primary flex items-center text-lg font-black">
            {formatRupiah(values.amount)}
          </p>
        </div>

        {/* Button */}
        <AppButton
          onClick={submit}
          text="Lanjut pembayaran"
          className="bg-primary hover:bg-primary/80 h-12 w-[58%] rounded-xl! text-white"
        />
      </div>
    </BasePage>
  );
};
