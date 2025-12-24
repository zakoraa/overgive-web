export interface RawUser {
    id: string;
    email?: string;
    phone?: string;
    user_metadata?: { fullName?: string; email_verified?: boolean;[k: string]: any };
}

export interface UserAuth {
    id: string;
    auth_id: string;
    email: string | null;
    fullName: string | null;
    role?: string | null;
    createdAt?: string;
    confirmedAt?: string | null;
}