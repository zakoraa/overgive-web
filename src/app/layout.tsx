import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/core/layout/navbar";
import { AppProvider } from "@/core/providers/app-provider";
import { MarginBottomBottomBar } from "@/core/components/ui/margin-bottom-bottom-bar";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overgive – Transparent Blockchain Donation Platform",
  description:
    "Overgive is a blockchain-powered donation crowdfunding platform that ensures transparency, accountability, and trust in every donation.",

  applicationName: "Overgive",
  creator: "Muhammad Rafli Silehu",
  publisher: "Overlogic",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Overgive – Transparent Blockchain Donation Platform",
    description:
      "A web-based donation crowdfunding platform integrated with blockchain to ensure transparency and accountability.",
    url: "https://overgive-web.vercel.app",
    siteName: "Overgive",
    images: [
      {
        url: "/images/overgive-logo-bg-white.png",
        width: 1200,
        height: 630,
        alt: "Overgive Platform",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <div id="modal-root" />
        <AppProvider>
          <Navbar />
          {children}
          <MarginBottomBottomBar />
        </AppProvider>
      </body>
    </html>
  );
}
