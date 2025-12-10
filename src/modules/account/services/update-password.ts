"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export async function updatePasswordService(payload: UpdatePasswordPayload) {
    try {
        const supabase = await supabaseServer();

        // 1. Ambil user saat ini
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return { success: false, message: "Gagal mendapatkan data pengguna." };
        }

        // 2. Re-auth user dulu menggunakan password lama
        const { error: reauthError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: payload.currentPassword,
        });

        if (reauthError) {
            return { success: false, message: "Password lama salah." };
        }

        // 3. Update password baru
        const { error: updateError } = await supabase.auth.updateUser({
            password: payload.newPassword,
        });

        if (updateError) {
            return { success: false, message: "Gagal memperbarui password." };
        }

        return { success: true, message: "Password berhasil diperbarui." };
    } catch (err: any) {
        return {
            success: false,
            message: err?.message ?? "Terjadi kesalahan tidak diketahui.",
        };
    }
}
