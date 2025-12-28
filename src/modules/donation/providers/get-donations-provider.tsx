"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  const [donations, setDonations] = useState<DonationWithBlockchain[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDonations = async () => {
    if (!user_id && !campaign_id) return;

    setLoading(true);
    try {
      const data = await getDonations({ user_id, campaign_id });
      setDonations(data);
      console.log("Donation DATA: ", data);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Gagal mengambil donasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [user_id, campaign_id]);

  return (
    <GetDonationsContext.Provider
      value={{ donations, loading, error, refresh: fetchDonations }}
    >
      {children}
    </GetDonationsContext.Provider>
  );
}

export function useGetDonationsContext() {
  const ctx = useContext(GetDonationsContext);
  if (!ctx)
    throw new Error(
      "useGetDonationsContext harus dipakai di dalam GetDonationsProvider",
    );
  return ctx;
}

// // modules/donation/context/donations-provider.tsx
// "use client";
// import { createContext, useContext } from "react";
// import { useEffect, useState, useCallback } from "react";
// import { getDonationssAction } from "../services/get-donations";
// import { DonationIPFS } from "@/core/types/donation-ipfs";

// interface GetDonationssProviderProps {
//   id: string;
//   by: "campaignId" | "userId";
//   children: React.ReactNode;
// }

// export function GetDonationssProvider({
//   id,
//   by,
//   children,
// }: GetDonationssProviderProps) {
//   const [donations, setDonations] = useState<DonationIPFS[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchDonations = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     const res = await getDonationssAction(id, by);

//     if (!res.success) {
//       setError(res.error ?? "Gagal mengambil data donasi");
//       setDonations([]);
//     } else {
//       setDonations(res.data ?? []);
//     }

//     setLoading(false);
//   }, [id, by]);

//   useEffect(() => {
//     fetchDonations();
//   }, [fetchDonations]);

//   return (
//     <DonationsContext.Provider
//       value={{
//         donations,
//         loading,
//         error,
//         refetch: fetchDonations,
//       }}
//     >
//       {children}
//     </DonationsContext.Provider>
//   );
// }

// export interface DonationsContextValue {
//   donations: DonationIPFS[];
//   loading: boolean;
//   error: string | null;
//   refetch: () => Promise<void>;
// }

// export const DonationsContext = createContext<DonationsContextValue | null>(
//   null,
// );

// export function useDonationsContext(): DonationsContextValue {
//   const ctx = useContext(DonationsContext);
//   if (!ctx) {
//     throw new Error(
//       "useDonationsContext harus dipakai di dalam GetDonationssProvider",
//     );
//   }
//   return ctx;
// }
