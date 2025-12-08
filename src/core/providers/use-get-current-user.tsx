"use client";

import { getCurrentUser } from "@/modules/auth/services/get-current-user";
import { createContext, useContext, useEffect, useState } from "react";

interface GetCurrentUserContextType {
  user: any | null;
  loading: boolean;
  reloadUser: () => Promise<void>;
}

const GetCurrentUserContext = createContext<GetCurrentUserContextType>({
  user: null,
  loading: true,
  reloadUser: async () => {},
});

export const useGetCurrentUserContext = () => useContext(GetCurrentUserContext);

export function GetCurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      console.log("Berhasil memuat user:", data);
      setUser(data);
    } catch (err) {
      console.error("Gagal memuat user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <GetCurrentUserContext.Provider
      value={{
        user,
        loading,
        reloadUser: loadUser,
      }}
    >
      {children}
    </GetCurrentUserContext.Provider>
  );
}
