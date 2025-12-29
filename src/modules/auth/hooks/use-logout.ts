"use client";

import { useState } from "react";
import { logoutUser } from "../services/logout-service";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutUser();

    } catch (err: any) {
      setError(err.message || "Logout gagal");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
}
