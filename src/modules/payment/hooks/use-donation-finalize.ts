"use client";

import { useEffect, useRef, useState } from "react";
import { PaymentRequest } from "@/modules/payment/types/payment";
import { saveDonationToBlockchainAction } from "../services/save-donation-to-blockchain";
import { saveDonationToIPFSAction } from "../services/save-donation-to-ipfs";

interface UseDonationFinalizeResult {
  processing: boolean;
  error: string | null;
  success: boolean;
}

export function useDonationFinalize(
  payment?: PaymentRequest | null
): UseDonationFinalizeResult {
  const hasProcessedRef = useRef(false);

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!payment) return;
    if (payment.status !== "SUCCEEDED") return;
    if (hasProcessedRef.current) return;

    hasProcessedRef.current = true;

    const run = async () => {
      try {
        setProcessing(true);

        // // 1️⃣ save ke blockchain
        const blockchainResult = await saveDonationToBlockchainAction({
          payment,
        });

        if (!blockchainResult.success) {
          throw new Error(blockchainResult.error);
        }

        // // NOTE:
        // // kalau saveDonationToBlockchainAction return txHash,
        // // pakai value itu. sementara asumsi sudah tersedia.
        const blockchainTxHash = blockchainResult.txHash;

        if(!blockchainTxHash){
          throw new Error("Gagal mendapatkan txHas Blockchain");
        }

        // 2️⃣ save ke IPFS
        const ipfsResult = await saveDonationToIPFSAction({
          payment,
          blockchainTxHash,
        });

        if (!ipfsResult.success) {
          throw new Error(ipfsResult.error);
        }

        const campaignId = payment.metadata?.campaign_id;
        if (!campaignId) {
          throw new Error("campaign_id tidak ditemukan");
        }


        setSuccess(true);
      } catch (e: any) {
        setError(e.message ?? "Gagal memproses donasi");
      } finally {
        setProcessing(false);
      }
    };

    run();
  }, [payment]);

  return {
    processing,
    error,
    success,
  };
}
