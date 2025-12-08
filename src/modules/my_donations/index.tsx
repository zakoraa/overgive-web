"use client";

import { Card } from "@/core/components/ui/card";
import { MyDonationCard } from "./components/my-donation-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { SearchBarWithSort } from "@/core/components/search_bar/search-bar-with-sort";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import CircularLoading from "@/core/components/ui/circular-loading";
import Image from "next/image";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const MyDonations = () => {
  const route = useRouter();
  const { user, loading } = useGetCurrentUserContext();
  return (
    <section className="container mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[600px]">
      <MarginTopNavbar />
      {loading && <CircularLoading />}
      {!loading && !user && (
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
            Silakan login terlebih dahulu untuk melanjutkan dan mengakses fitur
            ini.
          </p>

          <AppButtonSm
            onClick={() => route.push("/login")}
            text="Login Sekarang"
            icon={<LogInIcon className="h-5 w-5" />}
            className="text-md! px-8"
          />
        </div>
      )}
      {!loading && user && (
        <Card className="w-full space-y-2 px-10 py-3">
          <Title text="Donasi Saya" />
          <Line className="mb-2!" />
          <SearchBarWithSort placeholder="Cari donasi" />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <MyDonationCard key={i} />
          ))}
        </Card>
      )}
    </section>
  );
};
