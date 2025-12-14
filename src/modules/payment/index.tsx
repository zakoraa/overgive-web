"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

import { usePayment } from "@/modules/payment/hooks/use-payment";
import { useSimulatePayment } from "@/modules/payment/hooks/use-simulate-payment";

import { Card } from "@/core/components/ui/card";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalInfo } from "@/core/components/modal/modal-info";
import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";

export default function PaymentPage({ id }: { id: string }) {
  const router = useRouter();

  const { payment, loading } = usePayment(id);

  const {
    run: simulatePayment,
    loading: simulateLoading,
    data: simulateData,
    error: simulateError,
  } = useSimulatePayment();

  const [qrImage, setQrImage] = useState<string>("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);

  // ===============================
  // Generate QR Image dari actions
  // ===============================
  useEffect(() => {
    if (!payment?.actions) return;

    const qrString = payment.actions.find(
      (a) => a.type === "PRESENT_TO_CUSTOMER" && a.descriptor === "QR_STRING",
    )?.value;

    if (qrString) {
      QRCode.toDataURL(qrString).then(setQrImage);
    }
  }, [payment]);

  // ===============================
  // Show success modal (once)
  // ===============================
  useEffect(() => {
    if (payment?.status === "SUCCEEDED" && !hasShownSuccessModal) {
      console.log("SUCCESED PAYMENT: ", payment);
      setShowSuccessModal(true);
      setHasShownSuccessModal(true);
    }
  }, [payment?.status, hasShownSuccessModal]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.replace("/");
  };

  if (loading || !payment) {
    return <ModalLoading isOpen />;
  }

  return (
    <>
      <ModalLoading isOpen={simulateLoading} />
      {/* MODAL SUCCESS */}
      <ModalInfo
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        isSuccess
        message="Terima kasih 🙏<br/>Pembayaran donasi kamu berhasil diproses."
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

          {payment.status !== "SUCCEEDED" && (
            <button
              onClick={async () => {
                await simulatePayment(
                  payment.payment_request_id,
                  payment.request_amount,
                );
              }}
              disabled={simulateLoading}
              className="mt-3 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              Simulasi Pembayaran
            </button>
          )}

          {/* ERROR */}
          {simulateError && (
            <p className="text-sm text-red-600">{simulateError}</p>
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
