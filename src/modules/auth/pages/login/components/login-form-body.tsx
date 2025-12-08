"use client";

import { useRouter } from "next/navigation";
import { useLoginForm } from "../hooks/use-login-form";
import { useLogin } from "../hooks/use-login";
import { useState } from "react";
import { ModalInfo } from "@/core/components/modal/modal-info";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { AppButton } from "@/core/components/ui/app-button";
import { AppInput } from "@/core/components/ui/app-input";
import Link from "next/link";

export default function LoginFormBody() {
  const { form, setForm, errors, validate } = useLoginForm();
  const router = useRouter();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const { login, loading, error } = useLogin();

  const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;
    try {
      const user = await login(form.email, form.password);

      if (user) {
        router.push("/");
      } else {
        console.log("LOGIN ERROR: ", error);
        setModalInfoData({
          title: "Gagal!",
          message:
            "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
          imageUrl: "/svgs/failed.svg",
        });
        setModalInfoOpen(true);
      }
    } catch (err) {
      console.log("LOGIN ERROR: ", err);
      setModalInfoData({
        title: "Gagal!",
        message:
          "Login gagal. Silakan periksa kembali email dan kata sandi Anda.",
        imageUrl: "/svgs/failed.svg",
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
          title={modalInfoData.title}
          message={modalInfoData.message}
          imageUrl={modalInfoData.imageUrl}
        />
      </form>
    </>
  );
}
