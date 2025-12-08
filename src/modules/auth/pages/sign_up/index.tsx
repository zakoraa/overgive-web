import { Label } from "@/core/components/text/label";
import { Title } from "@/core/components/text/title";
import Image from "next/image";
import SignUpFormBody from "./components/sign-up-form-body";

export default function SignUpForm() {
  return (
    <main className="w-full justify-center px-4 md:mx-0">
      {/* Header */}
      <div className="mb-5 text-start">
        <div className="mb-10 flex items-center justify-center md:hidden">
          <Image
            src={"/images/overgive-logo.svg"}
            alt="overgive-logo"
            height={230}
            width={230}
          />
        </div>
        <Title text="Daftar Akun" />
        <Label
          className="text-sm text-gray-500"
          text="Lengkapi form untuk mendaftarkan akun!"
        />
      </div>

      {/* Body */}
      <SignUpFormBody />
    </main>
  );
}
