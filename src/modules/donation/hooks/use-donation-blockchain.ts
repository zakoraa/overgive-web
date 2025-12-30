import { useQuery } from "@tanstack/react-query";

export const useDonationBlockchain = (txHash?: string) => {
  return useQuery({
    queryKey: ["donation-blockchain", txHash],
    queryFn: async () => {
      const res = await fetch(
        `/api/donation/blockchain?tx_hash=${txHash}`,
      );
      const json = await res.json();

      if (!json.success || !json.data?.input) {
        throw new Error("Invalid blockchain response");
      }

      return json.data.input as string; 
  },
    enabled: !!txHash,
    staleTime: Infinity,        
    gcTime: 1000 * 60 * 60,  
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
