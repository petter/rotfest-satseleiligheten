import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Counter } from "./counter";
import { Redis } from "@upstash/redis";

import "./globals.css";

const redis = Redis.fromEnv();

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
  const count = await redis.incr("visits");
  await redis.publish("visits", count.toString());

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Counter defaultValue={count} />
        {children}
      </body>
    </html>
  );
}
