"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalInfo } from "@/core/components/modal/modal-info";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { AppButton } from "@/core/components/ui/app-button";
import { AppInput } from "@/core/components/ui/app-input";
import Link from "next/link";
import { useSignUp } from "../hooks/use-sign-up";
import { useSignUpForm } from "../hooks/use-sign-up-form";

export default function SignUpFormBody() {
  const { form, setForm, errors, validate } = useSignUpForm();
  const { submit, loading, error, user } = useSignUp();
  const router = useRouter();

  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const newUser = await submit(form);
      if (newUser) {
        setModalInfoData({
          title: "Berhasil!",
          message: "Akun Anda berhasil dibuat. Silakan login.",
          imageUrl: "/svgs/success.svg",
        });
        setModalInfoOpen(true);
      } else {
        setModalInfoData({
          title: "Gagal!",
          message: error || "Pendaftaran gagal. Silakan coba lagi.",
          imageUrl: "/svgs/failed.svg",
        });
        setModalInfoOpen(true);
      }
    } catch (err) {
      console.error(err);
      setModalInfoData({
        title: "Gagal!",
        message: "Terjadi kesalahan pada server.",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (user) router.push("/login");
  };

  return (
    <>
      <ModalLoading isOpen={loading} />
      <form className="space-y-3" onSubmit={handleSignUp}>
        <AppInput
          label="Nama"
          hint="Nama lengkap Anda"
          value={form.fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
          error={errors.fullName}
        />

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
          text="Daftar"
          isLoading={loading}
        />

        <p className="text-center text-sm">
          Sudah punya akun?{" "}
          <span className="text-primary font-bold">
            <Link href={"/login"}>Login</Link>{" "}
          </span>
        </p>

        <ModalInfo
          isOpen={modalInfoOpen}
          onClose={handleCloseInfoModal}
          title={modalInfoData.title}
          message={modalInfoData.message}
          imageUrl={modalInfoData.imageUrl}
        />
      </form>
    </>
  );
}
