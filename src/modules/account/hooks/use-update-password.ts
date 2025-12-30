"use client";

import { useMutation } from "@tanstack/react-query";
import type { PasswordFormValues } from "./use-update-password-form";
import { updatePasswordService } from "../services/update-password";

export function useUpdatePassword() {
  const mutation = useMutation({
    mutationFn: (payload: PasswordFormValues) =>
      updatePasswordService({
        currentPassword: payload.currentPassword,
        newPassword: payload.newPassword,
      }),
  });

  return {
    updatePassword: mutation.mutateAsync,
    loading: mutation.isPending,
    success: mutation.isSuccess,
    message: mutation.data?.message ?? mutation.error?.message ?? null,
  };
}
