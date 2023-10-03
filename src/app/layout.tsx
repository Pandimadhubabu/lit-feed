import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Lit Feed!",
  description: "Yet another feed reader",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full dark:bg-gray-900 bg-white">
      <UserProvider>
        <body className={`h-full ${inter.className}`}>{children}</body>
      </UserProvider>
    </html>
  );
}
