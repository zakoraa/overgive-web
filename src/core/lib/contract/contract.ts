import { ethers } from "ethers";
import { DONATIONS_ABI } from "../abi/donations/donation-abi";

// provider (RPC testnet/mainnet)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// wallet signer
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// contract instance
export const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!, 
  DONATIONS_ABI,
  wallet
);
