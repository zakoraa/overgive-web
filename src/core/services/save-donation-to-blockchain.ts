import { ethers } from "ethers";
import { DONATIONS_ABI } from "@/core/lib/abi/donations/donation-abi";

function toBytes32(str: string): string {
  const bytes = ethers.toUtf8Bytes(str);
  const padded = new Uint8Array(32);
  padded.set(bytes.slice(0, 32));
  return ethers.hexlify(padded);
}

export async function saveDonationToBlockchain(
  donationId: string,
  campaignId: string,
  paymentRef: string,
  amount: number,
  currency: string,
  donationHash: string,
  confirmedAt: number
): Promise<{
  txHash: string;
  blockNumber: number;
  gasUsed: string;
}> {
  if (
    !process.env.CONTRACT_RPC ||
    !process.env.CONTRACT_PRIVATE_KEY ||
    !process.env.CONTRACT_ADDRESS
  ) {
    throw new Error("Missing blockchain env variables");
  }

  const provider = new ethers.JsonRpcProvider(process.env.CONTRACT_RPC);
  const wallet = new ethers.Wallet(
    process.env.CONTRACT_PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    DONATIONS_ABI,
    wallet
  );

  console.log("🚀 Sending storeDonation tx...");

  const tx = await contract.storeDonation(
    donationId,
    campaignId,
    paymentRef,
    BigInt(amount),                 // ✅ sama kayak testing
    currency,
    toBytes32(donationHash),        // ✅ FIX UTAMA
    BigInt(confirmedAt)
  );

  console.log("📨 TX SENT");
  console.log("tx.hash =", tx.hash);

  const receipt = await tx.wait();

  console.log("✅ TX CONFIRMED");
  console.log("receipt =", receipt);
  console.log("status =", receipt.status);
  console.log("blockNumber =", receipt.blockNumber);
  console.log("gasUsed =", receipt.gasUsed.toString());

  return {
    txHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    gasUsed: receipt.gasUsed.toString(),
  };
}
