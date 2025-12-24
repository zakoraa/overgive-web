"use client";

import { Card } from "@/core/components/ui/card";
import { MyDonationCard } from "./components/my-donation-card";
import { MarginTopNavbar } from "@/core/components/ui/margin-top-navbar";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import CircularLoading from "@/core/components/ui/circular-loading";
import { LoginRequired } from "@/core/components/ui/login-required";
import {
  GetDonationsProvider,
  useGetDonationsContext,
} from "@/core/providers/get-donations-provider";

export const MyDonations = () => {
  const { user, loading } = useGetCurrentUserContext();
  const { loading: gettingDonations, donations } = useGetDonationsContext();

  return (
    <section className="container mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[600px]">
      <MarginTopNavbar />
      {(loading || gettingDonations) && <CircularLoading />}
      <LoginRequired />
      {!loading && !gettingDonations && user && (
        <Card className="w-full space-y-2 px-10 py-3">
          <Title text="Donasi Saya" />
          <Line className="mb-2!" />
          {donations.map((donation) => (
            <MyDonationCard key={donation.id} donation={donation} />
          ))}
        </Card>
      )}
    </section>
  );
};
