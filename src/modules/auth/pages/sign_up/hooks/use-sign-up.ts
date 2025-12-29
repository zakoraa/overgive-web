import { useState } from "react";
import { signUp } from "../services/sign-up-service";
import { User } from "@/core/types/user";

export type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const submit = async (formData: SignUpFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim()) {
        setError("Semua field wajib diisi");
        return null;
      }

      const result = await signUp(formData.fullName, formData.email, formData.password);
      if (!result) {
        setError("Gagal membuat user");
        return null;
      }

      setUser(result);
      return result;
    } catch (err) {
      // console.error(err);
      setError("Terjadi kesalahan pada server");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, user };
};
