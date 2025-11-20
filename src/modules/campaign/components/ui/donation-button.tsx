import { AppButton } from "@/components/ui/app-button";
import BasePage from "@/layout/base-page";

export const DonationButton = () => {
  return (
    <BasePage className="fixed bottom-0 h-16 w-full pt-2 pb-2!">
      <AppButton text="Donasi Sekarang" className="w-full rounded-xl!" />
    </BasePage>
  );
};
