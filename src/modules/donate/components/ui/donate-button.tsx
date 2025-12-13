"use client";

import BasePage from "@/core/layout/base-page";
import { AppButton } from "@/core/components/button/app-button";
import { formatRupiah } from "@/core/utils/currency";
import { useDonateForm } from "../../providers/donate-form-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalInfo } from "@/core/components/modal/modal-info";

export const DonateButton = () => {
  const router = useRouter();
  const { submitError, submit, values } = useDonateForm();

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async () => {
    const result = await submit();
    console.log("RESULT EX: ", result)

    // Kalau result null dan submitError ada → modal muncul
    if (!result && submitError) {
      setModalMessage(submitError);
      setModalOpen(true);
      return;
    }

    // Kalau result null tapi submitError null → ini cuma validasi gagal → jangan modal
    if (!result) return;

    console.log("EXTERNAL ID: ", result.payment_request_id);
    router.push(`/payment/${result.payment_request_id}`);
  };

  return (
    <>
      {/* Modal */}
      <ModalInfo
        isOpen={modalOpen}
        isSuccess={false}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />

      <BasePage className="fixed bottom-0 h-18 w-full pt-2 pb-2!">
        <div className="flex w-full items-center justify-between gap-2 px-3">
          <div className="flex flex-col text-center">
            <span className="text-xs font-semibold text-gray-500">
              Total Donasi
            </span>

            <p className="text-primary flex items-center text-lg font-black">
              {formatRupiah(values.amount)}
            </p>
          </div>

          <AppButton
            onClick={handleSubmit}
            text="Lanjut pembayaran"
            className="bg-primary hover:bg-primary/80 h-12 w-[58%] rounded-xl! text-white"
          />
        </div>
      </BasePage>
    </>
  );
};
