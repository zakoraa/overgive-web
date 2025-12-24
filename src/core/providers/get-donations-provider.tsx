// modules/donation/context/donations-provider.tsx
"use client";
import { createContext, useContext } from "react";
import { useEffect, useState, useCallback } from "react";
import { getDonationsAction } from "../services/get-donations";
import { DonationIPFS } from "@/core/types/donation-ipfs";

interface GetDonationsProviderProps {
  id: string;
  by: "campaignId" | "userId";
  children: React.ReactNode;
}

export function GetDonationsProvider({
  id,
  by,
  children,
}: GetDonationsProviderProps) {
  const [donations, setDonations] = useState<DonationIPFS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = useCallback(async () => {
    setLoading(true);
    setError(null);

    const res = await getDonationsAction(id, by);

    if (!res.success) {
      setError(res.error ?? "Gagal mengambil data donasi");
      setDonations([]);
    } else {
      setDonations(res.data ?? []);
    }

    setLoading(false);
  }, [id, by]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  return (
    <DonationsContext.Provider
      value={{
        donations,
        loading,
        error,
        refetch: fetchDonations,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
}

export interface DonationsContextValue {
  donations: DonationIPFS[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const DonationsContext = createContext<DonationsContextValue | null>(
  null,
);

export function useDonationsContext(): DonationsContextValue {
  const ctx = useContext(DonationsContext);
  if (!ctx) {
    throw new Error(
      "useDonationsContext harus dipakai di dalam GetDonationsProvider",
    );
  }
  return ctx;
}
