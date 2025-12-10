"use client";

import { Title } from "@/core/components/text/title";
import { Card } from "@/core/components/ui/card";
import { Line } from "@/core/components/ui/line";
import { useUpdatePasswordForm } from "../hooks/use-update-password-form";
import { useState } from "react";
import { useUpdatePassword } from "../hooks/use-update-password";
import { AppButtonSm } from "@/core/components/button/app-button-sm";
import { ModalInfo } from "@/core/components/modal/modal-info";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { AppInput } from "@/core/components/input/app-input";

export const UpdatePasswordCard = () => {
  const { values, errors, submitting, onChange, handleSubmit } =
    useUpdatePasswordForm();

  const { loading: updating, updatePassword } = useUpdatePassword();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const onSubmit = async () => {
    await handleSubmit(async () => {
      const result = await updatePassword(values);

      if (result.success) {
        setModalInfoData({
          title: "Berhasil!",
          message: "Password berhasil diperbarui.",
          imageUrl: "/svgs/success.svg",
        });
        setModalInfoOpen(true);
      } else {
        setModalInfoData({
          title: "Gagal!",
          message: result.message ?? "Gagal memperbarui password.",
          imageUrl: "/svgs/failed.svg",
        });
        setModalInfoOpen(true);
      }
    });
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (modalInfoData.title === "Berhasil!") {
      window.location.reload();
    }
  };

  return (
    <Card className="space-y-2 p-5 text-start">
      <div>
        <Title text="Perbarui Password" />
        <p className="text-sm text-gray-600">
          Gunakan password minimal 6 karakter.
        </p>
      </div>

      <Line />

      <form
        className="space-y-2 lg:max-w-[450px]"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <AppInput
          required
          isPassword
          label="Password Anda"
          hint="Masukkan password"
          value={values.currentPassword}
          onChange={(e) => onChange("currentPassword", e.target.value)}
          error={errors.currentPassword}
          labelMessage="Password awal Anda tersedia pada email yang telah dikirimkan kepada Anda."
        />

        <AppInput
          required
          isPassword
          label="Password Baru"
          hint="Masukkan password baru"
          value={values.newPassword}
          onChange={(e) => onChange("newPassword", e.target.value)}
          error={errors.newPassword}
        />

        <AppInput
          required
          isPassword
          label="Konfirmasi Password Baru"
          hint="Masukkan konfirmasi password baru"
          value={values.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
        />

        <div className="mt-5 flex items-end justify-end text-end lg:mt-0">
          <AppButtonSm
            type="submit"
            text={submitting ? "Memproses..." : "Perbarui Password"}
            className="w-full lg:w-fit"
          />
        </div>
      </form>
      <ModalInfo
        isOpen={modalInfoOpen}
        onClose={handleCloseInfoModal}
        title={modalInfoData.title}
        message={modalInfoData.message}
        imageUrl={modalInfoData.imageUrl}
      />

      <ModalLoading isOpen={updating} />
    </Card>
  );
};
