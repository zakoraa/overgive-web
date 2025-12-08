export function toTitleCase(name: string): string {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) =>
      word
        .split(".")
        .map((part) =>
          part.length > 0 ? part[0].toUpperCase() + part.slice(1).toLowerCase() : ""
        )
        .join(".")
    )
    .join(" ");
}