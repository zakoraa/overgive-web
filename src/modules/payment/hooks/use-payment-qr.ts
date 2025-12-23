"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { PaymentRequest } from "@/modules/payment/types/payment";

export function usePaymentQR(payment?: PaymentRequest | null) {
  const [qrImage, setQrImage] = useState<string>("");

  useEffect(() => {
    if (!payment?.actions) return;

    const qrString = payment.actions.find(
      (a) =>
        a.type === "PRESENT_TO_CUSTOMER" &&
        a.descriptor === "QR_STRING"
    )?.value;

    if (qrString) {
      QRCode.toDataURL(qrString).then(setQrImage);
    }
  }, [payment]);

  return qrImage;
}
