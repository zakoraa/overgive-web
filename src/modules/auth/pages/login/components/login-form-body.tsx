"use client";

import { useRouter } from "next/navigation";
import { useLoginForm } from "../hooks/use-login-form";
import { useLogin } from "../hooks/use-login";
import { useState } from "react";
import { ModalInfo } from "@/core/components/modal/modal-info";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import Link from "next/link";
import { AppButton } from "@/core/components/button/app-button";
import { AppInput } from "@/core/components/input/app-input";

export default function LoginFormBody() {
  const { form, setForm, errors, validate } = useLoginForm();
  const router = useRouter();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<{
    isSuccess: boolean;
    message: string;
  }>({
    isSuccess: false,
    message: "",
  });

  const { login, loading } = useLogin();

  const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const user = await login(form.email, form.password);

      if (user) {
        window.location.reload();
      } else {
        setModalInfo({
          isSuccess: false,
          message:
            "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
        });
        setModalInfoOpen(true);
      }
    } catch (err) {
      setModalInfo({
        isSuccess: false,
        message:
          "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
      });
      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
  };

  return (
    <>
      <ModalLoading isOpen={loading} />
      <form className="space-y-3" onSubmit={handleLoginWithEmail}>
        <AppInput
          label="Email"
          hint="contoh@gmail.com"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
        />

        <AppInput
          label="Password"
          hint="Minimal 6 karakter"
          isPassword={true}
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          error={errors.password}
        />

        <AppButton
          type="submit"
          width="100%"
          className="my-5"
          text="Login"
          isLoading={loading}
        />
        <p className="text-center text-sm">
          Belum punya akun?{" "}
          <span className="text-primary font-bold">
            <Link href={"/sign-up"}>Daftar</Link>{" "}
          </span>
        </p>

        <ModalInfo
          isOpen={modalInfoOpen}
          onClose={handleCloseInfoModal}
          isSuccess={modalInfo.isSuccess}
          message={modalInfo.message}
        />
      </form>
    </>
  );
}
