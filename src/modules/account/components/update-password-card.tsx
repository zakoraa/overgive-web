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
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";

export const UpdatePasswordCard = () => {
  const { values, errors, submitting, onChange, handleSubmit } =
    useUpdatePasswordForm();

  const { user, loading } = useGetCurrentUserContext();

  const { loading: updating, updatePassword } = useUpdatePassword();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    isSuccess: false,
    message: "",
  });

  const onSubmit = async () => {
    await handleSubmit(async () => {
      const result = await updatePassword(values);

      if (result.success) {
        setModalInfo({
          isSuccess: true,
          message: "Password berhasil diperbarui.",
        });
        setModalInfoOpen(true);
      } else {
        setModalInfo({
          isSuccess: false,
          message: result.message ?? "Gagal memperbarui password.",
        });
        setModalInfoOpen(true);
      }
    });
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);

    if (modalInfo.isSuccess) {
      window.location.reload();
    }
  };

  if (!user) return <></>;

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
        isSuccess={modalInfo.isSuccess}
        message={modalInfo.message}
      />

      <ModalLoading isOpen={updating} />
    </Card>
  );
};
