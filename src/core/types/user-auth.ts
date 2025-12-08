export interface RawUser {
    id: string;
    email?: string;
    phone?: string;
    user_metadata?: { fullName?: string; email_verified?: boolean;[k: string]: any };
}

export interface UserAuth {
    id: string;
    email: string | null;
    fullName: string | null;
    role?: string | null;
    createdAt?: string;
    confirmedAt?: string | null;
}

/**
 * Mapper: dari response mentah -> UserAuth
 */
export function mapToUserAuth(raw: RawUser): UserAuth {
    const email = raw.email ?? null;
    // beberapa service menyimpan nama di user_metadata.fullName atau user_metadata.full_name
    const meta = raw.user_metadata ?? {};
    const fullName =
        (typeof meta.fullName === "string" && meta.fullName.trim() !== "" && meta.fullName) ||
        (typeof meta.full_name === "string" && meta.full_name.trim() !== "" && meta.full_name) ||
        null;

    return {
        id: raw.id,
        email,
        fullName,
    };
}
