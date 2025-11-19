"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DockIcon, Dock } from "@/components/ui/dock";
import Image from "next/image";
import MenuBox from "./menu-box";
import { LoginButton } from "@/modules/auth/login/components/login-button";
import { Card } from "@/components/ui/card";

const allowedPages = ["/", "/my-donations", "/about-us"];

const Navbar = () => {
  const pathname = usePathname();

  if (!allowedPages.includes(pathname)) {
    return null; // jangan tampilkan navbar
  }

  return (
    <nav className="fixed top-0 z-50 mx-auto flex w-full items-center justify-between gap-x-5 py-6 transition-all duration-300 md:left-1/2 md:w-auto md:-translate-x-1/2 md:justify-center md:px-0">
      <Card className="flex h-12 px-7">
        <Image
          className="md:min-w-32"
          src={"/images/overgive-logo.svg"}
          alt="overgive-logo"
          height={100}
          width={100}
        />
      </Card>

      <Dock className="bg-card-background text-foreground hidden flex-row items-center space-x-16 rounded-2xl border border-gray-300 px-12 text-sm font-semibold whitespace-nowrap md:flex">
        <DockIcon className="hover:text-primary">
          <Link href="/">Beranda</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="/my-donations">Donasi Saya</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="/about-us">Tentang Kami</Link>
        </DockIcon>
      </Dock>

      <LoginButton />
      <MenuBox />
    </nav>
  );
};

export default Navbar;
