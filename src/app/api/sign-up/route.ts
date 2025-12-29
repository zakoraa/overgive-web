import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/core/lib/supabase/supabase-admin";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password } = await req.json();

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { message: "Nama lengkap, email, dan password harus diisi" },
                { status: 400 }
            );
        }

        const supabase = await supabaseAdmin();

        // cek apakah email sudah ada di tabel users
        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            // PGRST116 = tidak ada record
            // console.error(fetchError);
            return NextResponse.json({ message: "Gagal mengecek user" }, { status: 500 });
        }

        if (existingUser) {
            if (existingUser.deleted_at) {
                // user sebelumnya soft deleted, reactivate
                const { error: updateDbError } = await supabase
                    .from("users")
                    .update({ deleted_at: null, name: fullName })
                    .eq("id", existingUser.id);

                if (updateDbError) {
                    // console.error(updateDbError);
                    return NextResponse.json({ message: "Gagal mengupdate user" }, { status: 500 });
                }

                // update password di auth
                const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
                    existingUser.auth_id,
                    { password, user_metadata: { fullName } },
                );

                if (authUpdateError) {
                    // console.error(authUpdateError);
                    return NextResponse.json({ message: "Gagal update password Auth" }, { status: 500 });
                }

                return NextResponse.json({ donor: existingUser, password, reactivated: true });
            } else {
                return NextResponse.json({ message: "Email sudah digunakan" }, { status: 400 });
            }
        }

        // jika email belum ada, buat user baru di Auth
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: { fullName, role: "donor" },
        });

        if (authError || !authUser) {
            // console.error("Failed to register Auth user:", authError);
            return NextResponse.json({ message: "Gagal mendaftar user di Auth" }, { status: 500 });
        }

        // for testing
        const { data: updatedUser, error: confirmError } = await supabase.auth.admin.updateUserById(authUser.user.id, {
            email_confirm: true
        });

        if (confirmError) {
            // console.error(confirmError);
            return NextResponse.json({ message: "Gagal konfirmasi email otomatis" }, { status: 500 });
        }

        const { data: inserted, error: insertError } = await supabase
            .from("users")
            .insert([{ auth_id: authUser.user.id, name: fullName, email, role: "donor" }])
            .select("*")
            .single();

        if (insertError || !inserted) {
            // console.error("Failed to insert user in DB:", insertError);
            return NextResponse.json({ message: "Gagal menyimpan user di DB" }, { status: 500 });
        }

        return NextResponse.json({ donor: inserted, password, reactivated: false }, { status: 201 });
    } catch (err: any) {
        // console.error("API Error:", err);
        return NextResponse.json({ message: err.message || "Terjadi kesalahan pada server" }, { status: 500 });
    }
}
