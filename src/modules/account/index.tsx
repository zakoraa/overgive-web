import BasePage from "@/core/layout/base-page";
import { AccountInformationCard } from "./components/account-information-card";
import { UpdatePasswordCard } from "./components/update-password-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";
import { LoginRequired } from "@/core/components/ui/login-required";

export const Account = () => {
  return (
    <BasePage className="border-none bg-transparent">
      <MarginTopNavbar />
      <LoginRequired />
      <AccountInformationCard />
      <UpdatePasswordCard />
    </BasePage>
  );
};
