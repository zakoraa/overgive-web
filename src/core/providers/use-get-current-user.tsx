"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/modules/auth/services/get-current-user";
import { UserAuth } from "../types/user-auth";

interface GetCurrentUserContextType {
  user: UserAuth | null;
  loading: boolean;
  reloadUser: () => void;
}

const GetCurrentUserContext = createContext<GetCurrentUserContextType>({
  user: null,
  loading: true,
  reloadUser: () => {},
});

export const useGetCurrentUserContext = () => useContext(GetCurrentUserContext);

export function GetCurrentUserProvider({ children }: { children: ReactNode }) {
  const query = useQuery<UserAuth | null>({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <GetCurrentUserContext.Provider
      value={{
        user: query.data ?? null,
        loading: query.isLoading,
        reloadUser: () => query.refetch(),
      }}
    >
      {children}
    </GetCurrentUserContext.Provider>
  );
}
