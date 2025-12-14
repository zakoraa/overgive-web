// // app/api/webhook/xendit/route.ts
// import { saveDonationToBlockchain } from "@/core/lib/contract/contract";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("Webhook Xendit:", body);

//     // ==========================================================
//     // 1. VALIDASI EVENT XENDIT
//     // ==========================================================
//     if (!body?.data) {
//       return NextResponse.json({ message: "No data" }, { status: 400 });
//     }

//     const event = body.data;

//     // Example fields dari Xendit QRIS callback:
//     const paymentRef = event.id;
//     const status = event.status;
//     const amount = event.amount;
//     const externalId = event.external_id;
//     const paidAt = event.paid_at ? Math.floor(new Date(event.paid_at).getTime() / 1000) : 0;

//     // ==========================================================
//     // 2. Convert ke struktur yang dibutuhkan smart contract
//     // ==========================================================
//     const blockchainPayload = {
//       id: externalId,           // id dari sistem kamu
//       userId: "USER123",        // ambil dari DB kamu
//       campaignId: "CMP123",     // ambil dari DB kamu
//       paymentRef: paymentRef,   // dari Xendit
//       metadata: JSON.stringify(event),
//       hashItem: "",             // opsional
//       currency: "IDR",
//       status: status,
//       confirmedAt: paidAt,
//       createdAt: Math.floor(Date.now() / 1000),
//       isAnonymous: false,
//       donationMessage: ""
//     };

//     // ==========================================================
//     // 3. SAVE KE BLOCKCHAIN
//     // ==========================================================
//     const txHash = await saveDonationToBlockchain(blockchainPayload);

//     // ==========================================================
//     // 4. RESPONSE KE XENDIT
//     // ==========================================================
//     return NextResponse.json({
//       success: true,
//       txHash,
//     });

//   } catch (err) {
//     console.error("Webhook error:", err);
//     return NextResponse.json(
//       { error: "Internal error", detail: String(err) },
//       { status: 500 }
//     );
//   }
// }
