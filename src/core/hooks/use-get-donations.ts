"use client";

import { useEffect, useState } from "react";
import { getDonationsAction } from "../services/get-donations";

export function useGetDonations(id: string, by: "campaignId"| "userId") {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setLoading(true);

      const res = await getDonationsAction(id, by);

      if (!mounted) return;

      if (!res.success) {
        setError(res.error);
      } else {
        setData(res.data);
      }

      setLoading(false);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [id]);

  return {
    donations: data,
    loading,
    error,
  };
}
