"use client";

import { motion } from "motion/react";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center animate-gradient bg-[length:400%_400%]"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ef4444 0%, #facc15 20%, #4ade80 40%, #60a5fa 60%, #a855f7 80%, #ec4899 100%)",
      }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white text-center px-4"
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.2,
          rotate: 360,
          transition: { duration: 0.5 },
        }}
      >
        Rotfests beste leilighet!
      </motion.h1>
    </div>
  );
}
