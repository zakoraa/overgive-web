"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function logoutUser() {
  const supabase = await supabaseServer();

  await supabase.auth.signOut();
}
