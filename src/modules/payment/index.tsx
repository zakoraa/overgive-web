"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { usePayment } from "@/modules/payment/hooks/use-payment";
import { useSimulatePayment } from "@/modules/payment/hooks/use-simulate-payment";

import { Card } from "@/core/components/ui/card";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { ModalInfo } from "@/core/components/modal/modal-info";
import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Title } from "@/core/components/text/title";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { formatDateTimeWIB } from "@/core/utils/date";
import { CountdownBadge } from "./components/countdown-badge";
import { DownloadIcon, InfoIcon } from "lucide-react";
import { useDownloadQrImage } from "./hooks/use-download-qr-image";
import { usePaymentQrImage } from "./hooks/use-payment-qr-image";
import { useQrisGuideModal } from "./hooks/use-qris-guide-modal";
import { QrisGuideModal } from "./components/qris-guide-modal";

export default function PaymentPage({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [hasSimulated, setHasSimulated] = useState(false);

  const { payment, loading } = usePayment(id);

  const {
    run: simulatePayment,
    loading: simulateLoading,
    error: simulateError,
  } = useSimulatePayment();

  const qrString = payment?.actions?.[0]?.value;

  const { qrImage: generatedQrImage, loading: qrLoading } = usePaymentQrImage(
    qrString,
    {
      size: 300,
      margin: 2,
    },
  );

  const qrisGuideModal = useQrisGuideModal();

  const { downloadQr } = useDownloadQrImage();

  if (loading || !payment) {
    return <ModalLoading isOpen />;
  }

  const isSuccess = payment.status === "SUCCEEDED";

  return (
    <>
      <ModalLoading isOpen={(loading && payment) || simulateLoading} />

      <ModalInfo
        isOpen={!!simulateError}
        isSuccess={false}
        message={simulateError ?? ""}
        onClose={() => router.replace("/")}
      />

      <QrisGuideModal
        isOpen={qrisGuideModal.isOpen}
        onClose={qrisGuideModal.close}
      />

      <BasePage className="relative min-h-screen! items-start justify-between space-y-1 rounded-t-3xl! border-none pt-0! shadow-sm">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="absolute top-5 right-5 left-5 flex justify-between">
            {payment.channel_properties.expires_at && (
              <>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">Selesaikan sebelum</p>
                  <p className="font-bold">
                    {formatDateTimeWIB(payment.channel_properties.expires_at)}
                  </p>
                </div>
                {!isSuccess && (
                  <CountdownBadge
                    expiresAt={payment.channel_properties.expires_at}
                  />
                )}
              </>
            )}
          </div>
          <AppButtonSm
            icon={<InfoIcon className="h-5 w-5 text-yellow-500" />}
            text="Lihat panduan"
            onClick={qrisGuideModal.open}
            className="bg-transparent text-lg text-yellow-500!"
          />
        </div>
        {/* CARD QR */}
        <Card className="flex flex-col items-center space-y-4 bg-linear-to-bl! from-blue-500! to-blue-800! p-5 pb-15 text-center text-white shadow-sm">
          <Image
            src={"/images/qris.png"}
            alt="qris-logo"
            height={20}
            width={60}
          />

          <div>
            <Title text="Yayasan Overgive" />
            {payment.channel_properties.expires_at && (
              <p className="">Ref: {payment.reference_id}</p>
            )}
          </div>
          {isSuccess && (
            <div className="space-y-3">
              <img
                src={"/images/verify.png"}
                width={200}
                height={200}
                alt="payment-success"
              />

              <Title text="Pembayaran Berhasil" />

              <AppButtonSm
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["campaign_home"],
                  });
                  queryClient.invalidateQueries({ queryKey: ["donations"] });
                  router.replace("/");
                }}
                text="Kembali Ke Beranda"
                className="text-md! w-full! cursor-pointer bg-white! px-6 py-4 text-blue-500! disabled:opacity-50"
              />
            </div>
          )}
          {generatedQrImage && !isSuccess && !qrLoading && (
            <div className="flex flex-col items-center gap-4">
              <img
                src={generatedQrImage}
                width={240}
                height={240}
                alt="QRIS Payment"
                className="rounded-xl bg-white p-2"
              />

              <AppButtonSm
                icon={<DownloadIcon className="h-5 w-5" />}
                text="Unduh QR"
                onClick={() =>
                  downloadQr(generatedQrImage, {
                    size: 512,
                    filename: `overgive-qris-${payment.reference_id}.png`,
                  })
                }
                className="bg-transparent text-lg text-white underline"
              />
            </div>
          )}
        </Card>

        {/* AMOUNT */}
        <Card className="absolute right-0 bottom-0 left-0 flex justify-between rounded-b-none p-4 text-center shadow-sm">
          <div className="flex flex-col items-start">
            <Title text="Total " className="text-sm text-gray-600!" />
            <p className="text-xl font-black">
              {formatRupiah(payment.request_amount)}
            </p>
          </div>

          {!isSuccess && !hasSimulated && (
            <div className="flex w-full items-end justify-end text-right">
              <AppButtonSm
                onClick={async () => {
                  setHasSimulated(true);
                  await simulatePayment(
                    payment.payment_request_id,
                    payment.request_amount,
                  );
                }}
                text="Simulasi Pembayaran"
                className="text-md! cursor-pointer rounded-4xl! bg-blue-500! px-6 py-4 hover:bg-blue-500 disabled:opacity-50"
              />
            </div>
          )}
        </Card>
      </BasePage>
    </>
  );
}
