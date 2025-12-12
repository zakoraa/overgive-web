// lib/blockchain.ts
import { ethers } from "ethers";
import DonationsRecord from "@/core/lib/abi/DonationsRecord.json";

export const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);

export const wallet = new ethers.Wallet(
  process.env.BLOCKCHAIN_PRIVATE_KEY!,
  provider
);

export const donationContract = new ethers.Contract(
  process.env.DONATION_CONTRACT_ADDRESS!,
  DonationsRecord.abi,
  wallet
);

export async function saveDonationToBlockchain(data: {
  id: string;
  userId: string;
  campaignId: string;
  paymentRef: string;
  metadata: string;
  hashItem: string;
  currency: string;
  status: string;
  confirmedAt: number;
  createdAt: number;
  isAnonymous: boolean;
  donationMessage: string;
}) {
  const tx = await donationContract.storeDonation(
    data.id,
    data.userId,
    data.campaignId,
    data.paymentRef,
    data.metadata,
    data.hashItem,
    data.currency,
    data.status,
    data.confirmedAt,
    data.createdAt,
    data.isAnonymous,
    data.donationMessage
  );

  console.log("⏳ Sent TX:", tx.hash);
  await tx.wait();

  console.log("✅ Confirmed TX:", tx.hash);
  return tx.hash;
}
