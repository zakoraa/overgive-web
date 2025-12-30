"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDonations } from "../services/get-donations";
import { DonationWithBlockchain } from "../services/get-donation-by-id";

interface GetDonationsContextType {
  donations: DonationWithBlockchain[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const GetDonationsContext = createContext<GetDonationsContextType | undefined>(
  undefined,
);

interface GetDonationsProviderProps {
  user_id?: string;
  campaign_id?: string;
  children: ReactNode;
}

export function GetDonationsProvider({
  user_id,
  campaign_id,
  children,
}: GetDonationsProviderProps) {
  const query = useQuery<DonationWithBlockchain[]>({
    queryKey: ["donations", { user_id, campaign_id }],
    queryFn: () => getDonations({ user_id, campaign_id }),
    enabled: !!user_id || !!campaign_id,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <GetDonationsContext.Provider
      value={{
        donations: query.data ?? [],
        loading: query.isLoading,
        error: query.error ? (query.error as Error).message : null,
        refresh: () => query.refetch(),
      }}
    >
      {children}
    </GetDonationsContext.Provider>
  );
}

export function useGetDonationsContext() {
  const ctx = useContext(GetDonationsContext);
  if (!ctx) {
    throw new Error(
      "useGetDonationsContext harus dipakai di dalam GetDonationsProvider",
    );
  }
  return ctx;
}
