import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { DONATIONS_ABI } from "@/core/lib/abi/donations/donation-abi";
import type { Log, LogDescription } from "ethers";


function toBytes32(str: string): string {
  const bytes = ethers.toUtf8Bytes(str);
  const padded = new Uint8Array(32);
  padded.set(bytes.slice(0, 32));
  return ethers.hexlify(padded);
}

export async function GET() {
  try {
    if (
      !process.env.CONTRACT_RPC ||
      !process.env.CONTRACT_PRIVATE_KEY ||
      !process.env.CONTRACT_ADDRESS
    ) {
      return NextResponse.json(
        { error: "Missing blockchain env variables" },
        { status: 500 }
      );
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

    console.log("⏳ Sending storeDonation tx...");

    const tx = await contract.storeDonation(
      "don1",
      "camp1",
      "pay1",
      BigInt(1000),
      "IDR",
      toBytes32("hashdummy"),
      BigInt(Math.floor(Date.now() / 1000))
    );

    console.log("📨 TX SENT");
    console.log("tx.hash =", tx.hash);

    // tunggu tx confirm
    const receipt = await tx.wait();

    console.log("✅ TX CONFIRMED");
    console.log("status =", receipt.status);
    console.log("blockNumber =", receipt.blockNumber);
    console.log("gasUsed =", receipt.gasUsed.toString());

    // decode event DonationStored
    const iface = new ethers.Interface(DONATIONS_ABI);

const parsedLogs: (LogDescription | null)[] = receipt.logs.map(
  (log: Log): LogDescription | null => {
    try {
      return iface.parseLog(log);
    } catch {
      return null;
    }
  }
);

const donationEvents: LogDescription[] = parsedLogs.filter(
  (e): e is LogDescription =>
    e !== null && e.name === "DonationStored"
);


    console.log("📢 DonationStored events:", donationEvents);

   return NextResponse.json({
  txHash: receipt.transactionHash,
  blockNumber: receipt.blockNumber,
  events: donationEvents.map((e: ethers.LogDescription) => ({
    donationId: e.args.donationId,
    campaignId: e.args.campaignId,
    paymentRef: e.args.paymentRef,
    amount: e.args.amount.toString(),
    currency: e.args.currency,
    donationHash: e.args.donationHash,
    confirmedAt: e.args.confirmedAt.toString(),
  })),
});

  } catch (err: any) {
    console.error("❌ StoreDonation error:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
