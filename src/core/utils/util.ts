import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDonationPercentage(collected: number, target: number): number {
  if (target <= 0) return 0;

  const percentage = (collected / target) * 100;

  // Membatasi maksimal 100%
  return Math.min(Math.round(percentage), 100);
}
