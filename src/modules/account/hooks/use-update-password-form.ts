import { useState } from "react";

export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export function useUpdatePasswordForm() {
  const [values, setValues] = useState<PasswordFormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<PasswordFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (key: keyof PasswordFormValues, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined })); // reset error saat input berubah
  };

  const validate = (): boolean => {
    const newErrors: PasswordFormErrors = {};

    if (!values.currentPassword) {
      newErrors.currentPassword = "Password saat ini wajib diisi.";
    }

    if (!values.newPassword) {
      newErrors.newPassword = "Password baru wajib diisi.";
    } else if (values.newPassword.length < 6) {
      newErrors.newPassword = "Password baru minimal 6 karakter.";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi.";
    } else if (values.confirmPassword !== values.newPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (callback: (values: PasswordFormValues) => Promise<void>) => {
    if (!validate()) return false;

    setSubmitting(true);
    try {
      await callback(values);
      return true;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    errors,
    submitting,
    onChange,
    handleSubmit,
  };
}
