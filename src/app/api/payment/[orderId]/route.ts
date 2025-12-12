import { NextResponse } from "next/server";
import { ethers } from "ethers";
import DonationsRecord from "@/core/lib/abi/DonationsRecord.json";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } =await params;

    if (!orderId) {
      return NextResponse.json(
        { message: "orderId is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.XENDIT_API_KEY;
    const base64Key = Buffer.from(`${secretKey}:`).toString("base64");

    // GET QRIS PAYMENT STATUS
    const res = await fetch(
      `https://api.xendit.co/qr_codes/${orderId}`,
      {
        headers: {
          Authorization: `Basic ${base64Key}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Xendit error:", error);
      return NextResponse.json(
        { message: "Failed to get payment" },
        { status: 400 }
      );
    }

       // 1. Setup provider dan contract
const provider = new ethers.JsonRpcProvider(process.env.CONTRACT_RPC);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  DonationsRecord.abi,
  provider
);

const latestBlock = await provider.getBlockNumber();
const fromBlock = Math.max(latestBlock - 9, 0); // 10 blok terakhir
const toBlock = latestBlock;

const events = await contract.queryFilter(
  contract.filters.DonationStored(),
  fromBlock,
  toBlock
);

console.log("ALL EVENTS:", events.map(e => (e as any).args));

    const data = await res.json();
    console.log("GET QRIS: ", data)
    return NextResponse.json(data);

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
