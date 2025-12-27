export const formatDate = (timestamp: string | undefined | null): string => {
  if(!timestamp) return "";
  const date = new Date(timestamp);

  // Array nama bulan singkat
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDateTimeWIB = (
  timestamp: string | undefined
): string => {
  if (!timestamp) return "";

  const date = new Date(timestamp);

  // konversi ke WIB (UTC+7)
  const wib = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const months = [
    "Jan","Feb","Mar","Apr","Mei","Jun",
    "Jul","Agu","Sep","Okt","Nov","Des"
  ];

  const day = wib.getUTCDate();
  const month = months[wib.getUTCMonth()];
  const year = wib.getUTCFullYear();

  const hours = wib.getUTCHours().toString().padStart(2, "0");
  const minutes = wib.getUTCMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
};


export function getRemainingDays(targetDateString: string | undefined): string {
  if (!targetDateString) return "";

  const targetDate = new Date(targetDateString);
  const now = new Date();

  const diffMs = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return ``;
  }

  return `${diffDays} hari lagi`;
}


export function isExpired(targetDateString: string | undefined): boolean {
  if (!targetDateString) return false;

  const targetDate = new Date(targetDateString);
  const now = new Date();

  return targetDate.getTime() <= now.getTime();
}

export function timeAgo(dateString?: string | null): string {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // selisih dalam ms

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  if (days < 30) return `${days} hari yang lalu`;
  if (months < 12) return `${months} bulan yang lalu`;
  return `${years} tahun yang lalu`;
}
