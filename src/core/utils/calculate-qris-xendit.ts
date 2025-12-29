const QRIS_FEE = parseFloat(process.env.NEXT_PUBLIC_QRIS_FEE || "0.0063"); // fallback

export const calculateQrisFee = (amount: number) => {
  return amount * QRIS_FEE;
};