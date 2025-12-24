"use client";

import { useEffect, useState } from "react";
import { getDonations } from "../services/get-donations";
import { Donation } from "../types/donation";

interface UseDonationsOptions {
  user_id?: string;
  campaign_id?: string;
}

export function useDonations({ user_id, campaign_id }: UseDonationsOptions) {
  const [data, setData] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user_id && !campaign_id) return;

    setLoading(true);
    getDonations({ user_id, campaign_id })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user_id, campaign_id]);

  return { data, loading, error };
}


// "use client";

// import { useEffect, useState } from "react";
// import { getDonationsAction } from "../services/get-donations";

// export function useGetDonations(id: string, by: "campaignId"| "userId") {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;

//     const run = async () => {
//       setLoading(true);

//       const res = await getDonationsAction(id, by);

//       if (!mounted) return;

//       if (!res.success) {
//         setError(res.error);
//       } else {
//         setData(res.data);
//       }

//       setLoading(false);
//     };

//     run();

//     return () => {
//       mounted = false;
//     };
//   }, [id]);

//   return {
//     donations: data,
//     loading,
//     error,
//   };
// }
