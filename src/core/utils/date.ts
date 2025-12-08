export const formatDate = (timestamp: string | undefined): string => {
  if(!timestamp) return "";
  const date = new Date(timestamp);

  // Array nama bulan singkat
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
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
