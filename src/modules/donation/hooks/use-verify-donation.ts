import { useEffect, useState } from "react";
import type { DonationWithBlockchain } from "../services/get-donation-by-id";

export function useVerifyDonation(
  donation: DonationWithBlockchain | null,
  blockchainInput?: string | null
) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!donation || !blockchainInput) return;

    // Next.js/Webpack style worker
    const worker = new Worker(new URL("../utils/donation-worker.ts", import.meta.url));

    worker.postMessage({ donation, blockchainInput });

    worker.onmessage = (e) => {
      setIsValid(e.data);
      worker.terminate();
    };

    return () => worker.terminate();
  }, [donation, blockchainInput]);

  return { isValid, loading: isValid === null };
}
