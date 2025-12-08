import { useState } from "react";

export type LoginFormData = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password wajib diisi";
    } else if (form.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    form,
    setForm,
    errors,
    validate,
  };
}
