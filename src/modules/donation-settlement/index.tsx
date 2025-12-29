"use client";

import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";
import { DonationSettlementSummary } from "./types/donation-settlement";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { formatDate } from "@/core/utils/date";

interface DonationSettlementProps {
  summary: DonationSettlementSummary;
}

export const DonationSettlement = ({ summary }: DonationSettlementProps) => {
  return (
    <BasePage className="mx-auto rounded-b-2xl p-4 md:max-w-lg">
      <Title text={`Penggunaan Dana Kampanye ${summary.campaign_title}`} />
      <Line className="mt-0! mb-4" />
      <p className="w-full text-start text-sm text-gray-500">
        Terakhir update — {formatDate(summary.updated_at)}
      </p>

      <div className="mt-3 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-100">
            {/* Donation Settlement Summary */}
            <tr className="bg-gray-50">
              <td className="px-4 py-2">Total Donasi Masuk</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_gross)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Biaya Transaksi (Gas)</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_gas_fee)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2">Biaya Admin Xendit</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_xendit_fee)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-black">Total Potongan</td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(summary.total_fee)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2">
                Dana Donasi Bersih Sebelum Biaya Operasional
              </td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_net)}
              </td>
            </tr>

            {/* Operational Costs Detail */}
            {summary.operational_fees.map((op, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2">
                  • {op.note || "Biaya Operasional"}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatRupiah(op.amount)}
                </td>
              </tr>
            ))}
            {/* Total Operational */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-black">Total Biaya Operasional</td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(summary.total_operational)}
              </td>
            </tr>

            {/* Final Net */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2 font-black">Dana Bersih Tersalurkan</td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(summary.final_net)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BasePage>
  );
};
