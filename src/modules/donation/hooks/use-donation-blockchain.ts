"use client";

import { useEffect, useState } from "react";

export function useDonationBlockchain(txHash?: string | null) {
  const [input, setInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!txHash) return;

    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/donation/blockchain?tx_hash=${txHash}`,
          { cache: "no-store" }
        );
        const json = await res.json();

        if (res.ok) {
          setInput(json.data.input);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [txHash]);

  return { input, loading };
}
