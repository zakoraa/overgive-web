"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { usePayment } from "@/modules/payment/hooks/use-payment";
import { useSimulatePayment } from "@/modules/payment/hooks/use-simulate-payment";
import { usePaymentQR } from "@/modules/payment/hooks/use-payment-qr";

import { Card } from "@/core/components/ui/card";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalInfo } from "@/core/components/modal/modal-info";
import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";
import { useDonationFinalize } from "./hooks/use-donation-finalize";
import { useState } from "react";

export default function PaymentPage({ id }: { id: string }) {
  const router = useRouter();
  const [hasSimulated, setHasSimulated] = useState(false);

  const { payment, loading } = usePayment(id);
  const qrImage = usePaymentQR(payment);

  const {
    processing: finalizeProcessing,
    success: finalizeSuccess,
    error: finalizeError,
  } = useDonationFinalize(payment);

  const {
    run: simulatePayment,
    loading: simulateLoading,
    error: simulateError,
  } = useSimulatePayment();

  if (loading || !payment) {
    return <ModalLoading isOpen />;
  }

  return (
    <>
      <ModalLoading
        isOpen={(loading && payment) || simulateLoading || finalizeProcessing}
      />

      <ModalInfo
        isOpen={finalizeSuccess}
        isSuccess
        message="Terima kasih 🙏<br/>Pembayaran donasi kamu berhasil diproses."
        onClose={() => router.replace("/")}
      />

      <ModalInfo
        isOpen={!!finalizeError || !!simulateError}
        isSuccess={false}
        message={finalizeError ?? simulateError ?? ""}
        onClose={() => router.replace("/")}
      />

      <BasePage className="space-y-4 border-none bg-transparent p-4">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          Pembayaran Donasi
        </h1>

        {/* CARD QR */}
        <Card className="flex flex-col items-center space-y-4 p-5 text-center shadow-sm">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Payment Request ID
            </p>
            <p className="text-lg font-bold text-gray-800">{id}</p>
          </div>

          {/* QR Image */}
          {qrImage && (
            <div className="flex justify-center">
              <Image
                src={qrImage}
                width={240}
                height={240}
                alt="QRIS Payment"
                className="rounded-xl"
              />
            </div>
          )}

          <p className="text-sm text-gray-600">
            Scan QRIS menggunakan aplikasi pembayaran
          </p>

          {/* STATUS */}
          {payment.status === "SUCCEEDED" ? (
            <p className="font-semibold text-green-600">
              ✅ Pembayaran berhasil
            </p>
          ) : (
            <p className="font-semibold text-yellow-600">
              ⏳ Menunggu pembayaran
            </p>
          )}

          {payment.status !== "SUCCEEDED" && !hasSimulated && (
            <button
              onClick={async () => {
                setHasSimulated(true);
                await simulatePayment(
                  payment.payment_request_id,
                  payment.request_amount,
                );
              }}
              disabled={simulateLoading}
              className="mt-3 cursor-pointer rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
            >
              Simulasi Pembayaran
            </button>
          )}
        </Card>

        {/* AMOUNT */}
        <Card className="p-4 text-center shadow-sm">
          <p className="text-sm text-gray-500">Jumlah Pembayaran</p>
          <p className="text-primary text-2xl font-black">
            {formatRupiah(payment.request_amount)}
          </p>
        </Card>
      </BasePage>
    </>
  );
}
