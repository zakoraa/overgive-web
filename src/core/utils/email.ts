export function maskEmail(email: string): string {
    const [name, domain] = email.split("@");

    if (!name || !domain) return email;

    if (name.length <= 3) {
        return `${name[0]}***@${domain}`;
    }

    return `${name.slice(0, 2)}***${name.slice(-1)}@${domain}`;
}
