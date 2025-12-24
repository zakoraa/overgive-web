"use client"
import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import { DonationWithBlockchain } from "../../services/get-donation-by-id";
import { formatDateTimeWIB } from "@/core/utils/date";
import { formatRupiah } from "@/core/utils/currency";
import { addressLink, txLink } from "@/core/utils/amoy";
import { Line } from "@/core/components/ui/line";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { useRouter } from "next/navigation";

interface DonationDetailProps {
  donation: DonationWithBlockchain;
}

export const DonationDetail = ({ donation }: DonationDetailProps) => {
  const router = useRouter();
  return (
    <BasePage className="rounded-b-2xl px-5 py-3">
      <Title text="Detail Transaksi" />
      <Line className="my-1!" />

      <div className="mt-2 w-full space-y-2 text-sm">
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
          </p>
        )}

        {donation.blockchain && (
          <div className="mt-4 space-y-1 rounded-lg border p-3 text-xs text-gray-700">
            <p className="text-[11px] text-gray-500 italic">
              *Pencatatan blockchain menggunakan wallet resmi Yayasan Overgive
            </p>

            <p>
              <b>Block:</b> {donation.blockchain.blockNumber}
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
            </p>
          </div>
        )}
      </div>
      <AppButtonSm
        className="w-full"
        text="Lihat Kabar Terbaru"
        onClick={() => router.push(`/campaign/${donation.campaign_id}`)}
      />
    </BasePage>
  );
};
