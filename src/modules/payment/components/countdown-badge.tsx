"use client";

import { useCountdown } from "../hooks/use-countdown";
import { CountdownDigit } from "./countdown-digit";

interface Props {
  expiresAt: string;
}

export function CountdownBadge({ expiresAt }: Props) {
  const { hours, minutes, seconds, isExpired } = useCountdown(expiresAt);

  if (isExpired) {
    return (
      <div className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
        Waktu habis
      </div>
    );
  }

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return (
    <div className="flex items-center gap-1">
      <CountdownDigit value={hh[0]} />
      <CountdownDigit value={hh[1]} />
      <span className="mx-1 font-bold">:</span>

      <CountdownDigit value={mm[0]} />
      <CountdownDigit value={mm[1]} />
      <span className="mx-1 font-bold">:</span>

      <CountdownDigit value={ss[0]} />
      <CountdownDigit value={ss[1]} />
    </div>
  );
}
