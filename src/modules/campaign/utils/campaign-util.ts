// utils/campaign-display.ts

import { CampaignCategory } from "@/core/types/campaign-category";
import { CampaignStatus } from "@/core/types/campaign-status";
import { getRemainingDays, isExpired } from "@/core/utils/date";

export const categoryDisplay: Record<CampaignCategory, string> = {
  education: "Pendidikan",
  natural_disaster: "Bencana Alam",
  health: "Kesehatan",
  orphanage: "Panti Asuhan",
  worship_place: "Tempat Ibadah",
  disability: "Disabilitas",
  environment: "Lingkungan",
  others: "Lainnya",
};

export function getCampaignStatusInfo(
  status: CampaignStatus | undefined,
  endedAt: string | undefined,
) {
  if (!endedAt) {
    return {
      label: "Berlangsung",
      colorClass: "text-primary-dark bg-primary-faded",
    };
  }

  const expired = isExpired(endedAt);
  const remainingLabel = getRemainingDays(endedAt);

  // active + masih ada waktu → remaining
  if (status === "active" && !expired) {
    return {
      label: remainingLabel,
      colorClass: "text-amber-600 bg-amber-100",
    };
  }

  // inactive + masih ada waktu → ditutup
  if (status === "inactive" && !expired) {
    return {
      label: "Ditutup",
      colorClass: "text-red-800 bg-red-300",
    };
  }

  // active + waktu habis → selesai
  if (status === "active" && expired) {
    return {
      label: "Selesai",
      colorClass: "text-red-500 bg-red-100",
    };
  }

  // inactive + waktu habis → selesai
  return {
    label: "Selesai",
    colorClass: "text-red-500 bg-red-100",
  };
}