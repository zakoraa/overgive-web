import { useState } from "react";
import type { PasswordFormValues } from "./use-update-password-form";
import { updatePasswordService } from "../services/update-password";

export function useUpdatePassword() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    

    const updatePassword = async (payload: PasswordFormValues) => {
        setLoading(true);
        setMessage(null);
        setSuccess(null);

        try {
            const result = await updatePasswordService({
                currentPassword: payload.currentPassword,
                newPassword: payload.newPassword,
            });

            setSuccess(result.success);
            setMessage(result.message);

            return result;
        } catch (err: any) {
            setSuccess(false);
            setMessage(err?.message ?? "Terjadi kesalahan.");
            return { success: false, message: err?.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        message,
        success,
        updatePassword,
    };
}
