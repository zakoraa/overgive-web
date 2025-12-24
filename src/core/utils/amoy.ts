// core/utils/polygonscan.ts
const AMOY_BASE_URL = "https://amoy.polygonscan.com";

export const txLink = (txHash?: string) =>
  txHash ? `${AMOY_BASE_URL}/tx/${txHash}` : "#";

export const addressLink = (address?: string) =>
  address ? `${AMOY_BASE_URL}/address/${address}` : "#";
