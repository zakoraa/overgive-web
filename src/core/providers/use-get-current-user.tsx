"use client";

import { getCurrentUser } from "@/modules/auth/services/get-current-user";
import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "../types/user-auth";

interface GetCurrentUserContextType {
  user: UserAuth | null;
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
  const [user, setUser] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
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
