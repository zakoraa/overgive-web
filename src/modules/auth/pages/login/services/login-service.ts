"use server"

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function loginWithEmailPassword(email: string, password: string) {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    let message = error.message;
    switch (message) {
      case "Invalid login credentials":
        message = "Email atau password salah";
        break;
      default:
        message = "Terjadi kesalahan yang tidak diketahui";
        break;
    }
    return { success: false, message };
  }

  // Cek role setelah login
  const user = data.user;
  if (!user) {
    return { success: false, message: "User tidak ditemukan" };
  }

  const role = user.user_metadata?.role;
  if (role !== "donor") {
    return { success: false, message: "Hanya donatur yang dapat login" };
  }

  return { success: true, message: "Login berhasil!" };
}