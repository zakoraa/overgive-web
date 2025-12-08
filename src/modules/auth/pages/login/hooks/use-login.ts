"use client"
import { useState } from "react";
import { loginWithEmailPassword } from "../services/login-service";
import { getCurrentUser } from "@/modules/auth/services/get-current-user";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginWithEmailPassword(email, password);
      console.log("LOGIN response: ", response);

      if (!response.success) {
        setError(response.message); // simpan pesan dari service
        return null;
      }
      return response; // sukses
    } catch (err) {
      console.log("ERROR USE_LOGIN: ", err);
      setError("Login gagal. Terjadi kesalahan server.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
