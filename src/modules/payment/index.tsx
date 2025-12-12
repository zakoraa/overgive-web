"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { usePayment } from "@/modules/payment/hooks/use-payment";
import { Card } from "@/core/components/ui/card";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import BasePage from "@/core/layout/base-page";

export default function PaymentPage({ orderId }: { orderId: string }) {
  const { payment, loading } = usePayment(orderId);
  const [qrImage, setQrImage] = useState<string>("");

  useEffect(() => {
    if (payment?.qr_string) {
      QRCode.toDataURL(payment.qr_string).then(setQrImage);
    }
  }, [payment]);

  if (loading || !payment) return <ModalLoading isOpen />;

  return (
    <BasePage className="space-y-4 p-4 bg-transparent border-none">
      <h1 className="text-center text-2xl font-bold text-gray-800">
        Pembayaran Donasi
      </h1>

      <Card className="flex flex-col items-center space-y-4 p-5 text-center shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-600">Order ID</p>
          <p className="text-lg font-bold text-gray-800">{orderId}</p>
        </div>

        {/* QR Image */}
        {qrImage && (
          <div className="flex justify-center">
            <Image
              src={qrImage}
              width={240}
              height={240}
              alt="QRIS Payment"
              className="rounded-xl shadow-md"
            />
          </div>
        )}

        <div>
          <p className="text-sm text-gray-600">
            Scan QRIS menggunakan aplikasi pembayaran
          </p>
        </div>

        {/* QR STRING BOX */}
        <div className="w-full">
          <p className="mb-1 text-xs text-gray-500">QR String</p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 p-3 text-xs text-gray-700">
            {payment.qr_string}
          </pre>
        </div>
      </Card>

      {/* Amount Section */}
      <Card className="p-4 shadow-sm">
        <p className="text-sm text-gray-500">Jumlah Pembayaran</p>
        <p className="text-primary text-2xl font-semibold">
          Rp {payment.amount.toLocaleString("id-ID")}
        </p>
      </Card>
    </BasePage>
  );
}
