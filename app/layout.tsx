import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Counter } from "./counter";
import { Redis } from "@upstash/redis";
import { FloatingImage } from "./components/floating-image";

import "./globals.css";

// Initialize Redis if environment variables are available
let redis: Redis | null = null;
try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv();
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
        <Counter defaultValue={count} />
        <FloatingImage 
          src="/gutta.jpg" 
          alt="Gutta i aksjon" 
          width={400} 
          height={400} 
          speed={{ x: 1, y: 3 }}
          initialPosition={{ x: 150, y: 150 }}
        />
         <FloatingImage 
          src="/gutta2.jpg" 
          alt="Gutta i aksjon" 
          width={400} 
          height={400} 
          speed={{ x: 3, y: 1 }}
          initialPosition={{ x: 300, y: 300 }}
        />
        {children}
      </body>
    </html>
  );
}
