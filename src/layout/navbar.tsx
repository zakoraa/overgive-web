import Link from "next/link";
import { DockIcon, Dock } from "@/components/ui/dock";
import Image from "next/image";
import MenuBox from "./menu-box";
import { LoginButton } from "@/modules/auth/login/components/login-button";

const Navbar = async () => {
  return (
    <nav className="fixed top-0 z-50 mx-auto flex w-full items-center justify-between gap-x-5 px-6 py-6 transition-all duration-300 md:left-1/2 md:w-auto md:-translate-x-1/2 md:justify-center md:px-0">
      <div className="bg-background mx-0 flex h-12 w-fit rounded-2xl border border-gray-400 px-7 shadow-sm">
        <Image
          className="min-w-26"
          src={"/images/app-logo.svg"}
          alt="app-logo"
          height={100}
          width={100}
        />
      </div>

      <Dock className="bg-background text-foreground hidden flex-row items-center space-x-12 rounded-2xl border border-gray-400 px-8 text-sm whitespace-nowrap shadow-sm md:flex">
        <DockIcon className="hover:text-primary">
          <Link href="/">Beranda</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="about-us">Tentang Kami</Link>
        </DockIcon>
        <DockIcon className="hover:text-primary">
          <Link href="my-donations">Donasi Saya</Link>
        </DockIcon>
      </Dock>

      <LoginButton />
      <MenuBox />
    </nav>
  );
};

export default Navbar;
