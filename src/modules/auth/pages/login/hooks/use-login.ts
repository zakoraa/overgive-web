"use client"
import { useState } from "react";
import { loginWithEmailPassword } from "../services/login-service";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginWithEmailPassword(email, password);

      if (!response.success) {
        setError(response.message);
        return null;
      }
      return response; 
    } catch (err) {
      setError("Login gagal. Terjadi kesalahan server.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
