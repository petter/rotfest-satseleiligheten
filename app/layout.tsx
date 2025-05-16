import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Counter } from "./counter";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satseleiligheten",
  description: "Rotfests råeste leilighet!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Counter />
        {children}
      </body>
    </html>
  );
}
