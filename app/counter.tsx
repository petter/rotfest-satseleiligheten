"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  defaultValue: number;
}

export function Counter({ defaultValue }: Props) {
  const [count, setCount] = useState(defaultValue);

  useEffect(() => {
    const eventSource = new EventSource("/api/visits");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCount(data.count);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="retro-counter fixed bottom-0 right-0 m-4">
      <div className="counter-label">Besøkende</div>
      <div className="digital-display">
        {count
          .toString()
          .padStart(6, "0")
          .split("")
          .map((digit, index) => (
            <div key={index} className="digit">
              <AnimatePresence mode="wait">
                <motion.div
                  key={digit}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {digit}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
}
