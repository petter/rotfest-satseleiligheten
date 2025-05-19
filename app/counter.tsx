"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  defaultValue: number;
}

export function Counter({ defaultValue }: Props) {
  const [count, setCount] = useState(defaultValue);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    
    const connectEventSource = () => {
      if (eventSource) {
        eventSource.close();
      }
      
      eventSource = new EventSource("/api/visits");

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (typeof data.count === 'number') {
            setCount(data.count);
          }
        } catch (error) {
          console.error("Failed to parse SSE data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        eventSource?.close();
        eventSource = null;
        
        // Try to reconnect after 3 seconds
        if (reconnectTimeout) {
          clearTimeout(reconnectTimeout);
        }
        reconnectTimeout = setTimeout(connectEventSource, 3000);
      };
    };
    
    connectEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const moveCounter = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      setPosition((prev) => {
        const newX = prev.x + 2 * direction.x;
        const newY = prev.y + 1 * direction.y;

        // Check and handle X boundaries
        if (newX >= maxX) {
          setDirection((d) => ({ ...d, x: -1 }));
          return { ...prev, x: maxX };
        }
        if (newX <= 0) {
          setDirection((d) => ({ ...d, x: 1 }));
          return { ...prev, x: 0 };
        }

        // Check and handle Y boundaries
        if (newY >= maxY) {
          setDirection((d) => ({ ...d, y: -1 }));
          return { ...prev, y: maxY };
        }
        if (newY <= 0) {
          setDirection((d) => ({ ...d, y: 1 }));
          return { ...prev, y: 0 };
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveCounter, 16); // ~60fps
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <motion.div
      ref={containerRef}
      className="retro-counter fixed m-4"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        duration: 0.016,
        ease: "linear",
      }}
      style={{
        position: "fixed",
        zIndex: 1000,
      }}
    >
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
    </motion.div>
  );
}
