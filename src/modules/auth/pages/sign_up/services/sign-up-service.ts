"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { User } from "@/core/types/user";


export async function signUp(fullName: string, email: string, password: string): Promise<User | null> {
    const url = await absoluteUrl('/api/sign-up');

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        if (!res.ok) return null;

        const user: User = await res.json();
        return user;
    } catch (err) {
        // console.error("Fetch API error:", err);
        return null;
    }
}
