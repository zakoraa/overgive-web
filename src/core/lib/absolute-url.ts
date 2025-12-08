import { headers } from "next/headers";

export async function absoluteUrl(path: string) {
  const host = (await headers()).get("host")!;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocol}://${host}${path}`;
}
