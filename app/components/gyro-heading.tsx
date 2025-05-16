"use client";

import { motion } from "motion/react";
import { ReactNode, useRef } from "react";

interface GyroHeadingProps {
  children: ReactNode;
  className?: string;
  rotationSensitivity?: number;
  perspective?: number;
  transitionSpeed?: number;
}

export function GyroHeading({
  children,
  className = "",
  rotationSensitivity = 25,
  perspective = 500,
  transitionSpeed = 0.15,
}: GyroHeadingProps) {
  const abortController = useRef<AbortController | null>(new AbortController());
  return (
    <motion.h1
      ref={(ref) => {
        if (ref === null) {
          abortController.current?.abort();
          return;
        }

        const handleMouseMove = (e: MouseEvent) => {
          const rect = ref.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const rotateX =
            ((e.clientY - centerY) / centerY) * rotationSensitivity;
          const rotateY =
            ((e.clientX - centerX) / centerX) * rotationSensitivity;

          ref.style.transform = `perspective(${perspective}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        };

        window.addEventListener("mousemove", handleMouseMove, {
          signal: abortController.current?.signal,
        });
      }}
      className={className}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: `${perspective}px`,
        transition: `transform ${transitionSpeed}s ease-out`,
      }}
    >
      {children}
    </motion.h1>
  );
}
