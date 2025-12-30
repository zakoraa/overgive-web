import { useQuery } from "@tanstack/react-query";
import { getDonationByIdAction } from "../services/get-donation-by-id";
import { DonationWithBlockchain } from "../services/get-donation-by-id";

export const useDonationById = (id: string) => {
  return useQuery<DonationWithBlockchain>({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await getDonationByIdAction(id);
      if (!res.success || !res.data) {
        throw new Error("Donasi tidak ditemukan");
      }
      return res.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60,
  });
};
