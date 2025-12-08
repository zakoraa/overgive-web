
export const formatRupiah = (value: string | number, showRp: boolean = true): string => {
  const numericValue = Number(value) || 0;

  return numericValue.toLocaleString("id-ID", {
    style: showRp ? "currency" : "decimal",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(showRp ? '' : 'Rp', '');
};

export const parseCurrency = (value: any): number => {
  if (!value) return 0;
  return Number(String(value).replace(/[^\d]/g, "")) || 0;
};

