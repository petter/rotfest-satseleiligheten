"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Counter } from "../counter";
import { FloatingImage } from "./floating-image";
import { useAppContext } from "../context/app-context";

interface Props {
  count: number;
}

export function FloatingElements({ count }: Props) {
  const { isMenuOpen, setCurrentPath } = useAppContext();
  const pathname = usePathname();
  
  // Update current path on client side whenever pathname changes
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname, setCurrentPath]);
  
  // Only show floating elements on home page when menu is closed
  const shouldShow = pathname === "/" && !isMenuOpen;
  
  if (!shouldShow) return null;
  
  return (
    <>
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
    </>
  );
}
