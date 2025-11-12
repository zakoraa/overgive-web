import Link from "next/link";
import { DockIcon, Dock } from "@/components/ui/dock";
import Image from "next/image";
import MenuBox from "./menu-box";
import { LoginButton } from "@/modules/auth/login/components/login-button";
import { Card } from "@/components/ui/card";

const Navbar = async () => {
  return (
    <nav className="fixed top-0 z-50 mx-auto flex w-full items-center justify-between gap-x-5 py-6 transition-all duration-300 md:left-1/2 md:w-auto md:-translate-x-1/2 md:justify-center md:px-0">
      <Card className="flex h-12 px-7">
        <Image
          className="md:min-w-26"
          src={"/images/overgive-logo.svg"}
          alt="overgive-logo"
          height={100}
          width={100}
        />
      </Card>

      <Dock className="bg-background text-foreground font-semibold hidden flex-row items-center space-x-16 rounded-2xl border border-gray-300 px-12 text-sm whitespace-nowrap md:flex">
        <DockIcon className="hover:text-primary ">
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
