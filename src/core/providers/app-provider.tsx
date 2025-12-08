"use client";

import { queryClient } from "@/core/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { GetCurrentUserProvider } from "./use-get-current-user";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GetCurrentUserProvider>{children}</GetCurrentUserProvider>
    </QueryClientProvider>
  );
}
