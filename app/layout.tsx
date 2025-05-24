import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Redis } from "@upstash/redis";
import { AvantGardeMenu } from "./components/avant-garde-menu";
import { AppProvider } from "./context/app-context";
import { FloatingElements } from "./components/floating-elements";
import { AudioPlayer } from "./components/audio-player";

import "./globals.css";

// Initialize Redis if environment variables are available
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN
    });
  } else {
    console.warn("Upstash Redis environment variables not found. Using fallback values.");
  }
} catch (error) {
  console.error("Failed to initialize Redis client:", error);
}

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
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use a default value if Redis is not available
  let count = 0;
  try {
    if (redis) {
      count = await redis.incr("visits");
      await redis.publish("visits", count.toString());
    } else {
      console.warn("Redis not available, using default visitor count");
    }
  } catch (error) {
    console.error("Error accessing Redis:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <AvantGardeMenu />
          <FloatingElements count={count} />
          <AudioPlayer />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
