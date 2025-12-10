import BasePage from "@/core/layout/base-page";
import { AccountInformationCard } from "./components/account-information-card";
import { UpdatePasswordCard } from "./components/update-password-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";

export const Account = () => {
  return (
    <BasePage className="bg-transparent border-none">
      <MarginTopNavbar />
      <AccountInformationCard />
      <UpdatePasswordCard />
    </BasePage>
  );
};
