import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { DONATIONS_ABI } from "@/core/lib/abi/donations/donation-abi";

export async function GET() {
  try {
    if (!process.env.CONTRACT_RPC || !process.env.CONTRACT_ADDRESS) {
      return NextResponse.json(
        { error: "Missing blockchain env variables" },
        { status: 500 }
      );
    }

    const provider = new ethers.JsonRpcProvider(process.env.CONTRACT_RPC);
    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      DONATIONS_ABI,
      provider
    );

    // 1️⃣ ambil semua ID
    const ids: string[] = await contract.getDonationIds();

    // kalau belum ada donation
    if (ids.length === 0) {
      return NextResponse.json({
        count: 0,
        donations: [],
      });
    }

    // 2️⃣ ambil detail satu-satu
    const donations = await Promise.all(
      ids.map((id) => contract.getDonation(id))
    );

    return NextResponse.json({
      count: donations.length,
      donations,
    });
  } catch (err: any) {
    console.error("GetAllDonations error:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
