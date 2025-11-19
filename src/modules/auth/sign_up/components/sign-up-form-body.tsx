"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/alert";
import { AppButton } from "@/components/ui/app-button";
import { AppInput } from "@/components/ui/app-input";
import Link from "next/link";

interface FormState {
  email: string;
  password: string;
}

export default function SignUpFormBody() {
  // const { form, setForm, errors, validate } = useLoginForm();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [showLoginErrorAlert, setShowLoginErrorAlert] = useState("");
  // const { login, loading, error } = useLogin();
  // const handleLoginWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!validate()) return;

  //   const user = await login(form.email, form.password);

  //   if (user) {
  //     setShowLoginErrorAlert("");
  //     router.push("/");
  //   } else {
  //     setShowLoginErrorAlert(error || "Login gagal. Harap periksa email dan password!");
  //   }
  // };
  return (
    <form className="space-y-3">
      <AppInput
        label="Nama"
        hint="Nama anda"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        // error={errors.email}
      />
      <AppInput
        label="Email"
        hint="contoh@gmail.com"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
        // error={errors.email}
      />

      <AppInput
        label="Password"
        hint="Minimal 6 karakter"
        isPassword={true}
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setForm((prev) => ({ ...prev, password: e.target.value }))
        }
        // error={errors.password}
      />

      <AppButton
        width="100%"
        className="my-5"
        text="Daftar"
        //  isLoading={loading}
      />
      <p className="text-center text-sm">
        Sudah punya akun?{" "}
        <span className="text-primary font-bold">
          <Link href={"/login"}>Login</Link>{" "}
        </span>
      </p>
      {showLoginErrorAlert && (
        <div className="my-5">
          <Alert
            variant="error"
            title="Gagal Masuk"
            message={showLoginErrorAlert}
          />
        </div>
      )}
    </form>
  );
}
