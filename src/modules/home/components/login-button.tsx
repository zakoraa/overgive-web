"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import { ModalConfirm } from "@/core/components/modal/modal-confirm";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { ModalLoading } from "@/core/components/modal/modal-loading";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { cn } from "@/core/lib/utils";

export const LoginButton = () => {
  const router = useRouter();
  const { loading, user } = useGetCurrentUserContext();
  const { logout, loading: logoutLoading } = useLogout();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  if (loading) return null;

  /* ✅ BELUM LOGIN */
  if (!user) {
    return (
      <>
        {/* Desktop */}
        <button
          onClick={() => router.push("/login")}
          className="from-primary-dark to-primary text-background hover:from-primary hover:to-primary hidden h-12 cursor-pointer items-center gap-2 rounded-2xl border border-gray-300 bg-linear-to-tl px-7 transition-all duration-300 md:flex"
        >
          <span className="text-sm font-medium">Login</span>
          <LogInIcon className="h-4 w-4" />
        </button>

        {/* Mobile (icon only) */}
        <button
          onClick={() => router.push("/login")}
          className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-white md:hidden"
          aria-label="Login"
        >
          <LogInIcon className="h-5 w-5" />
        </button>
      </>
    );
  }

  /* ✅ SUDAH LOGIN */
  return (
    <>
      <ModalLoading isOpen={logoutLoading} />

      {/* Desktop */}
      <button
        onClick={() => setOpenLogoutModal(true)}
        className="hidden h-12 cursor-pointer items-center gap-2 rounded-2xl border border-red-300 bg-red-400 px-7 font-bold text-white transition-all duration-300 hover:opacity-80 md:flex"
      >
        <LogOutIcon className="h-4 w-4" />
        <span className="text-sm">
          {logoutLoading ? "Logout..." : "Logout"}
        </span>
      </button>

      {/* ✅ Mobile: icon only */}
      <button
        onClick={() => setOpenLogoutModal(true)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-red-400 md:hidden",
          logoutLoading && "pointer-events-none opacity-50",
        )}
        aria-label="Logout"
      >
        <LogOutIcon className="h-5 w-5 text-white" />
      </button>

      <ModalConfirm
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        onConfirm={async () => {
          setOpenLogoutModal(false);
          await logout();
          window.location.reload();
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
