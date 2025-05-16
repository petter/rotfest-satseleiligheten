"use client";

import { GyroHeading } from "./components/gyro-heading";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center animate-gradient bg-[length:400%_400%]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ef4444 0%, #facc15 20%, #4ade80 40%, #60a5fa 60%, #a855f7 80%, #ec4899 100%)",
      }}
    >
      <GyroHeading className="text-4xl md:text-6xl font-bold text-white text-center px-4">
        Rotfests beste leilighet!
      </GyroHeading>
    </div>
  );
}
