"use client";

import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import BasePage from "@/core/layout/base-page";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useCampaignDeliveryHistoryDetailContext } from "./providers/get-delivery-history-detail-provider";
import { Card } from "@/core/components/ui/card";
import { formatDate } from "@/core/utils/date";
import { useVerifyCampaignDeliveryHistory } from "./hooks/use-verify-campaign-delivery-history";
import { CheckCircle, XCircle } from "lucide-react";
import { txLink } from "@/core/utils/amoy";
import { ModalLoading } from "@/core/components/modal/modal-loading";

export const DeliveryHistoryDetail = () => {
  const { data, loading, error } = useCampaignDeliveryHistoryDetailContext();

  const { isValid, loading: isValidating } =
    useVerifyCampaignDeliveryHistory(data);
  if (loading) {
    return (
      <BasePage className="flex justify-center p-6">
        <ModalLoading isOpen />
      </BasePage>
    );
  }

  if (!data) {
    return <></>;
  }
  if (error || !data) {
    return (
      <BasePage className="p-6">
        <p className="text-sm text-red-500">Gagal memuat detail laporan</p>
      </BasePage>
    );
  }

  return (
    <div className="mx-auto space-y-3 lg:w-[50%]">
      <Card className="p-6">
        <Title text="Validasi Data Laporan" />
        <Line />

        {isValidating && <CircularLoading />}

        {data?.blockchain_tx_hash && (
          <p className="break-all">
            <b>Tx Hash:</b>{" "}
            <a
              href={txLink(data?.blockchain_tx_hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data?.blockchain_tx_hash}
            </a>
            <span className="block text-xs text-gray-500">
              Kode unik transaksi. Klik untuk melihat dan memverifikasi keaslian
              donasi di blockchain.
            </span>
          </p>
        )}

        {!isValidating && data?.blockchain_tx_hash && (
          <div
            className={`mt-5 flex items-center gap-3 rounded-xl border p-4 text-sm ${
              loading
                ? "border-gray-300 bg-gray-50 text-gray-600"
                : isValid
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-red-500 bg-red-50 text-red-700"
            }`}
          >
            {isValidating ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            ) : isValid ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}

            <div className="flex flex-col">
              <span className="font-semibold">
                {isValidating
                  ? "Memverifikasi Laporan..."
                  : isValid
                    ? "Laporan Terverifikasi"
                    : "Laporan Tidak Terverifikasi"}
              </span>

              <span className="text-xs opacity-80">
                {isValidating
                  ? "Mencocokkan data laporan dengan catatan blockchain"
                  : isValid
                    ? "Data laporan cocok dengan hash di blockchain"
                    : "Data laporan tidak cocok dengan blockchain"}
              </span>
            </div>
          </div>
        )}
      </Card>
      <Card className="mx-auto p-6">
        <Title text={data.title} />
        <Line />

        <p className="mb-3 text-sm text-gray-500">
          Dibuat pada: {formatDate(data.created_at)}
        </p>
        <div
          className="prose max-w-none text-sm text-gray-600"
          dangerouslySetInnerHTML={{
            __html: data.note ?? "",
          }}
        />
      </Card>
    </div>
  );
};
