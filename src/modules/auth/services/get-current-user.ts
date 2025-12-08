"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { UserAuth } from "@/core/types/user-auth";

export async function getCurrentUser(): Promise<UserAuth | null> {
    try {
        const supabase = await supabaseServer();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return null;
        }

        return {
            id: user.id,
            email: user.email ?? null,
            fullName: user.user_metadata?.fullName ?? null,
            role: user.user_metadata?.role ?? user.role ?? null,
            createdAt: user.created_at,
            confirmedAt: user.confirmed_at ?? null,
        };
    } catch {
        return null;
    }
}
