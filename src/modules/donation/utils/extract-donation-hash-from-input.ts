import { ethers } from "ethers";
import { DONATIONS_ABI } from "@/core/lib/abi/donations/donation-abi";

export function extractDonationHashFromInput(input: string): string {
  const iface = new ethers.Interface(DONATIONS_ABI);
  const decoded = iface.parseTransaction({ data: input });

  // args[5] = bytes32 donationHash
  const donationHashBytes32 = decoded?.args?.[5];
  if (!donationHashBytes32) return "";

  // bytes32 -> hex string TANPA 0x
  return donationHashBytes32.replace(/^0x/, "");
}

