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
import { LoginRequired } from "@/core/components/ui/login-required";

export const MyDonations = () => {
  const route = useRouter();
  const { user, loading } = useGetCurrentUserContext();
  return (
    <section className="container mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[600px]">
      <MarginTopNavbar />
      {loading && <CircularLoading />}
      <LoginRequired/>
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
