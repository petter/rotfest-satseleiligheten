"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: {
    x: number;
    y: number;
  };
  initialPosition?: {
    x: number;
    y: number;
  };
  zIndex?: number;
}

export function FloatingImage({
  src,
  alt,
  width,
  height,
  speed = { x: 1.5, y: 1 },
  initialPosition = { x: 100, y: 100 },
  zIndex = 999,
}: Props) {
  const [position, setPosition] = useState(initialPosition);
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveImage = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;

      setPosition((prev) => {
        const newX = prev.x + speed.x * direction.x;
        const newY = prev.y + speed.y * direction.y;

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

    const interval = setInterval(moveImage, 16); // ~60fps
    return () => clearInterval(interval);
  }, [direction, speed]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed"
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
        zIndex: zIndex,
      }}
    >
      <div className="floating-image-container">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="floating-image"
        />
      </div>
    </motion.div>
  );
}
