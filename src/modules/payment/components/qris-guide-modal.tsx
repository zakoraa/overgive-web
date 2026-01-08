import { Modal } from "@/core/components/modal/modal";
import { CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function QrisGuideModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5">
        <h2 className="text-lg font-bold text-gray-900">
          Cara Membayar dengan QRIS
        </h2>

        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
            <span>
              Buka aplikasi pembayaran atau mobile banking yang mendukung QRIS
            </span>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
            <span>
              Pilih menu <b>Bayar / Scan QR</b>
            </span>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Arahkan kamera ke QRIS yang tampil di layar ini</span>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Pastikan nama merchant & nominal sudah benar</span>
          </li>

          <li className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
            <span>Konfirmasi pembayaran di aplikasi kamu</span>
          </li>
        </ul>

        <div className="rounded-lg bg-yellow-50 p-3 text-xs text-yellow-700">
          Jika pembayaran berhasil, status akan diperbarui otomatis.
        </div>
      </div>
    </Modal>
  );
}
