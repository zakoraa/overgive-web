// src/lib/xendit.ts

export const XENDIT_API_KEY = process.env.XENDIT_API_KEY!;
export const XENDIT_BASE_URL = "https://api.xendit.co";

export async function xenditRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${XENDIT_BASE_URL}${url}`, {
    ...options,
    headers: {
      Authorization: `Basic ${Buffer.from(XENDIT_API_KEY + ":").toString("base64")}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Xendit error:", errorText);
    throw new Error(errorText);
  }

  return res.json();
}
