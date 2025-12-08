"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { ModalConfirm } from "@/core/components/modal/modal-confirm";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { LogInIcon, LogOutIcon } from "lucide-react";

export const LoginButton = () => {
  const router = useRouter();
  const { loading, user } = useGetCurrentUserContext();
  const { logout, loading: logoutLoading } = useLogout();

  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  if (loading) return null;

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="from-primary-dark to-primary text-background hover:from-primary hover:to-primary hidden h-12 cursor-pointer items-center space-x-2 rounded-2xl border border-gray-300 bg-linear-to-tl px-7 md:flex"
      >
        <p className="text-sm font-medium">Login</p>

        <LogInIcon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <>
      <ModalLoading isOpen={logoutLoading} />

      <button
        onClick={() => setOpenLogoutModal(true)}
        className="hidden h-12 cursor-pointer items-center space-x-2 rounded-2xl border border-red-300 bg-red-500 px-7 text-white transition hover:opacity-80 md:flex"
      >
        <LogOutIcon className="h-4 w-4" />

        <p className="text-sm font-medium">
          {logoutLoading ? "Logout..." : "Logout"}
        </p>
      </button>

      <ModalConfirm
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={async () => {
          setOpenLogoutModal(false);
          await logout();
          router.refresh();
        }}
        title="Logout"
        description="Apakah kamu yakin ingin logout dari akun ini?"
        confirmText="Logout"
        cancelText="Batal"
        confirmClassName="bg-red-500"
        cancelClassName="bg-primary"
      />
    </>
  );
};
