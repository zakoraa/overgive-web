import { NextResponse } from "next/server";
import { PaymentRequest } from "@/modules/payment/types/payment";
import { saveDonationToIPFS } from "@/modules/donation/services/save-donation-to-ipfs";
import { buildDonationIPFSPayload } from "@/modules/donation/services/build-donation-ipfs-payload";
import { IPFS_GROUP } from "@/core/types/ipfs-group";

interface SaveDonationToIPFSRequest {
  payment: PaymentRequest;
  blockchainTxHash: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SaveDonationToIPFSRequest;
    const { payment, blockchainTxHash } = body;

    if (payment.status !== "SUCCEEDED") {
      return NextResponse.json(
        { error: "Payment not succeeded" },
        { status: 400 }
      );
    }

    if (!blockchainTxHash) {
      return NextResponse.json(
        { error: "Blockchain tx hash required" },
        { status: 400 }
      );
    }
   
    const payload = buildDonationIPFSPayload(
      payment,
      blockchainTxHash
    );

    const { cid, url } = await saveDonationToIPFS(payload, IPFS_GROUP.DONATIONS);

    return NextResponse.json({
      success: true,
      cid,
      url,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
