"use client";
import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import { DonationWithBlockchain } from "../../services/get-donation-by-id";
import { formatDateTimeWIB } from "@/core/utils/date";
import { formatRupiah } from "@/core/utils/currency";
import { txLink } from "@/core/utils/amoy";
import { Line } from "@/core/components/ui/line";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { useRouter } from "next/navigation";
import { useVerifyDonation } from "../../hooks/use-verify-donation";
import { CheckCircle, XCircle } from "lucide-react";

interface DonationDetailProps {
  donation: DonationWithBlockchain;
}

export const DonationDetail = ({ donation }: DonationDetailProps) => {
  const { isValid, loading } = useVerifyDonation(donation);

  const router = useRouter();

  return (
    <BasePage className="rounded-b-2xl px-5 py-3">
      <Title text="Detail Transaksi" />
      <Line className="my-1!" />

      <div className="mt-2 mb-5 w-full space-y-2 text-sm">
        <p>
          <b>Campaign:</b> {donation.campaign.title}
        </p>

        {!donation.is_anonymous && (
          <p>
            <b>Nama Donatur:</b> {donation.username}
          </p>
        )}

        <p>
          <b>Jumlah:</b> {formatRupiah(donation.amount)}
        </p>

        <p>
          <b>Tanggal:</b> {formatDateTimeWIB(donation.created_at)}
        </p>

        {donation.donation_message && (
          <p>
            <b>Pesan:</b> {donation.donation_message}
          </p>
        )}

        {donation.blockchain && (
          <p className="break-all">
            <b>Tx Hash:</b>{" "}
            <a
              href={txLink(donation.blockchain.hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {donation.blockchain.hash}
            </a>
            <span className="block text-xs text-gray-500">
              Kode unik transaksi. Klik untuk melihat dan memverifikasi keaslian
              donasi di blockchain.
            </span>
          </p>
        )}

        {!loading && donation.blockchain && (
          <div
            className={`mt-5 flex items-center gap-3 rounded-xl border p-4 text-sm ${
              loading
                ? "border-gray-300 bg-gray-50 text-gray-600"
                : isValid
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-red-500 bg-red-50 text-red-700"
            } `}
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            ) : isValid ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}

            <div className="flex flex-col">
              <span className="font-semibold">
                {loading
                  ? "Memverifikasi Donasi..."
                  : isValid
                    ? "Donasi Terverifikasi"
                    : "Donasi Tidak Terverifikasi"}
              </span>

              <span className="text-xs opacity-80">
                {loading
                  ? "Mencocokkan data donasi dengan catatan blockchain"
                  : isValid
                    ? "Data donasi cocok dengan hash yang tersimpan di blockchain"
                    : "Data donasi tidak sesuai dengan catatan blockchain dan telah dimanipulasi"}
              </span>
            </div>
          </div>
        )}

        {/* {donation.blockchain && (
          <div className="mt-4 space-y-1 rounded-lg border p-3 text-xs text-gray-700">
            <p className="text-[11px] text-gray-500 italic">
              Informasi berikut adalah catatan transparansi donasi yang
              tersimpan secara permanen di blockchain.
            </p>

            <p className="text-[11px] text-gray-500 italic">
              *Pencatatan blockchain menggunakan wallet resmi Yayasan Overgive
            </p>
            <p className="mt-2 font-bold">Blockchain</p>

            <p className="break-all">
              <b>From:</b>{" "}
              <a
                href={addressLink(donation.blockchain.from)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {donation.blockchain.from}
              </a>
              <span className="block text-[11px] text-gray-500">
                Alamat pengirim transaksi di jaringan blockchain.
              </span>
            </p>

            <p className="break-all">
              <b>To:</b>{" "}
              <a
                href={addressLink(donation.blockchain.to)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {donation.blockchain.to}
              </a>
              <span className="block text-[11px] text-gray-500">
                Alamat wallet resmi Yayasan Overgive sebagai penerima donasi.
              </span>
            </p>
          </div>
        )} */}
      </div>

      <AppButtonSm
        className="w-full"
        text="Lihat Kabar Terbaru"
        onClick={() =>
          router.push(`/campaign/${donation.campaign_id}/delivery-history`)
        }
      />
    </BasePage>
  );
};
