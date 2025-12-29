"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, HeartHandshake, User } from "lucide-react";
import { cn } from "../lib/utils";

const menus = [
  {
    href: "/",
    label: "Beranda",
    icon: Home,
  },
  {
    href: "/my-donations",
    label: "Riwayat Donasi",
    icon: HeartHandshake,
  },
  {
    href: "/my-profile",
    label: "Akun",
    icon: User,
  },
];

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200  bg-card-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {menus.map((menu) => {
          const isActive = pathname === menu.href;
          const Icon = menu.icon;

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              <Icon className="h-6 w-6" />
              <span>{menu.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomBar;
