import { ethers } from "ethers";
import { DONATIONS_ABI } from "../lib/abi/donations/donation-abi";

function toBytes32(str: string): string {
  const bytes = ethers.toUtf8Bytes(str);
  const padded = new Uint8Array(32);
  padded.set(bytes.slice(0, 32)); // potong kalau lebih dari 32
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
): Promise<string> {
  try {
    if (!process.env.CONTRACT_RPC || !process.env.CONTRACT_PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
      throw new Error("Missing environment variables for blockchain");
    }

    // provider dan wallet signer
    const provider = new ethers.JsonRpcProvider(process.env.CONTRACT_RPC);
    const wallet = new ethers.Wallet(process.env.CONTRACT_PRIVATE_KEY, provider);

    // pastikan wallet sebagai signer
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, DONATIONS_ABI, wallet);

    // konversi donationHash ke bytes32
    const donationHashBytes = toBytes32(donationHash);

    // kirim transaksi
    const tx = await contract.storeDonation(
      donationId,
      campaignId,
      paymentRef,
      BigInt(amount),
      currency,
      donationHashBytes,
      BigInt(confirmedAt)
    );

    const receipt = await tx.wait();
    console.log("Donation saved on blockchain, tx hash:", receipt.transactionHash);
    return receipt.transactionHash;
  } catch (err: any) {
    console.error("Error saving donation to blockchain:", err.message || err);
    throw err;
  }
}
