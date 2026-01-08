"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface Options {
  size?: number;   
  margin?: number; 
}

export function usePaymentQrImage(
  qrString?: string,
  options?: Options
) {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!qrString) return;

    const generate = async () => {
      try {
        setLoading(true);

        const dataUrl = await QRCode.toDataURL(qrString, {
          width: options?.size ?? 300,
          margin: options?.margin ?? 2,
          errorCorrectionLevel: "M", // standar payment
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        setQrImage(dataUrl);
      } catch (error) {
        console.error("Gagal generate QR image", error);
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [qrString, options?.size, options?.margin]);

  return {
    qrImage,
    loading,
  };
}
