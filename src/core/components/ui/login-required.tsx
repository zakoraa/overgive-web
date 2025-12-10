"use client"

import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { AppButtonSm } from "../button/app-button-sm";
import { Title } from "../text/title";
import { useRouter } from "next/navigation";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";

export const LoginRequired = () => {
  const route = useRouter();
  const { user, loading } = useGetCurrentUserContext();

  if (loading || user) return <></>;

  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-5">
      <Image
        src={"/images/login-required.png"}
        width={150}
        height={150}
        alt="login-required"
      />

      <Title
        text="Login Diperlukan"
        className="text-center text-3xl font-bold text-gray-700"
      />

      <p className="text-center text-sm text-gray-500">
        Silakan login terlebih dahulu untuk melanjutkan dan mengakses fitur ini.
      </p>

      <AppButtonSm
        onClick={() => route.push("/login")}
        text="Login Sekarang"
        icon={<LogInIcon className="h-5 w-5" />}
        className="text-md! px-8"
      />
    </div>
  );
};
