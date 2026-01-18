import { ethers } from "ethers";
import { DONATIONS_ABI } from "@/core/lib/abi/donations/donation-abi";

export async function saveDonationToBlockchain(
  donationId: string,
  campaignId: string,
  paymentRef: string,
  amount: number,
  currency: string,
  donationHash: string,
  confirmedAt: number
): Promise<{
  txHash: string | null;
  blockNumber: number;
  gasUsed: string;
  gasPrice: string;
}> {
  try {
    if (!donationId || amount <= 0 || !currency) {
      throw new Error("Invalid donation data");
    }
    
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

    // console.log("🚀 Sending storeDonation tx...");
    const donationHashBytes32 = "0x" + donationHash;

    let tx;
    let receipt;

    try {
      tx = await contract.storeDonation(
        donationId,
        campaignId,
        paymentRef,
        BigInt(amount),
        currency,
        donationHashBytes32,
        BigInt(confirmedAt)
      );

      // console.log("📨 TX SENT");
      // console.log("tx.hash =", tx.hash);

      receipt = await tx.wait();

      // console.log("✅ TX CONFIRMED");
      // console.log("receipt =", receipt);
      // console.log("status =", receipt.status);
      // console.log("blockNumber =", receipt.blockNumber);
      // console.log("gasUsed =", receipt.gasUsed.toString());
    } catch (e: any) {
      console.error("Blockchain transaction failed (non-fatal):", e);

      // Return default values jika transaksi gagal
      return {
        txHash: null,
        blockNumber: 0,
        gasUsed: "0",
        gasPrice: "0",
      };
    }

    return {
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString(),
      gasPrice: receipt.gasPrice.toString(),
    };
  } catch (err: any) {
    console.error("Error saveDonationToBlockchain:", err);
    throw err; // error fatal, misal env tidak lengkap
  }
}
