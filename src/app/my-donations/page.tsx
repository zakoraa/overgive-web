"use client";

import CircularLoading from "@/core/components/ui/circular-loading";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { MyDonations } from "@/modules/my_donations";

export default function Page() {
  const { user, loading } = useGetCurrentUserContext();
  if (loading) return <CircularLoading />;
  return (
    <GetDonationsProvider user_id={user?.id}>
      <MyDonations />{" "}
    </GetDonationsProvider>
  );
}
