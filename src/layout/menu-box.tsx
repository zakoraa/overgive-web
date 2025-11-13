"use client";
import { useState } from "react";
import Link from "next/link";

const MenuBox = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="block md:hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="bg-background flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-300 shadow-sm"
      >
        {menuOpen ? (
          /* Close (X) Icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="text-title-color"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          /* Hamburger Icon */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="text-title-color"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Menu Box */}
      <div
        className={`bg-background fixed left-1/2 z-40 mt-2 w-[90%] -translate-x-1/2 transform rounded-xl border border-zinc-300 px-6 py-4 shadow-sm transition-all duration-500 ease-in-out ${
          menuOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {/* Navbar List */}
        <ul className="text-text-title-color flex flex-col items-center justify-center space-y-4 text-sm">
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/my-donations">Donasi Saya</Link>
          </li>
          <li>
            <Link href="/about-us">Tentang Kami</Link>
          </li>
          <li>
            <Link className="text-primary flex space-x-1" href="">
              <p className="text-sm font-bold">Login</p>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12H14.88"
                  stroke="#20847c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.6504 8.6499L16.0004 11.9999L12.6504 15.3499"
                  stroke="#20847c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.5002 13V15.26C21.5002 19.73 19.7102 21.52 15.2402 21.52H15.1102C11.0902 21.52 9.24016 20.07 8.91016 16.53"
                  stroke="#20847c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.90039 7.55999C9.21039 3.95999 11.0604 2.48999 15.1104 2.48999H15.2404C19.7104 2.48999 21.5004 4.27999 21.5004 8.74999"
                  stroke="#20847c"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBox;
