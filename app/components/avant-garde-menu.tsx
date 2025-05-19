"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "../context/app-context";

interface MenuItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, isActive, onClick }) => {
  return (
    <motion.div
      className={`menu-item ${isActive ? "active" : ""}`}
      whileHover={{ scale: 1.1, rotate: Math.random() * 5 - 2.5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={onClick}
    >
      <Link href={href} className={`block relative p-2 ${isActive ? "text-pink-500" : "text-white"}`}>
        <span className="relative z-10">{label}</span>
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 rounded-md"
            layoutId="activeBackground"
            initial={{ borderRadius: 8 }}
            style={{ borderRadius: 8 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export function AvantGardeMenu() {
  const { isMenuOpen: isOpen, setIsMenuOpen: setIsOpen, setCurrentPath } = useAppContext();
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHue, setCursorHue] = useState(0);
  
  // Update the current path in context
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname, setCurrentPath]);
  
  // Rainbow cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorHue((hue) => (hue + 1) % 360);
    }, 20);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const menuItems = [
    { href: "/", label: "HJEM" },
    { href: "/om", label: "OM SATSELEILIGHETEN" },
    // Add more menu items as needed
  ];

  return (
    <>
      {/* Rainbow cursor */}
      <motion.div
        className="fixed pointer-events-none w-6 h-6 rounded-full mix-blend-screen z-50"
        style={{ 
          backgroundColor: `hsl(${cursorHue}, 100%, 50%)`,
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          boxShadow: `0 0 20px 5px hsl(${cursorHue}, 100%, 70%)`,
        }}
        animate={{ scale: isOpen ? 1.5 : 1 }}
      />
      
      {/* Menu toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <span className="sr-only">Meny</span>
        <motion.div 
          className="w-6 h-0.5 bg-white absolute top-4 left-3"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 3 : 0 }}
        />
        <motion.div 
          className="w-6 h-0.5 bg-white absolute top-6 left-3"
          animate={{ opacity: isOpen ? 0 : 1 }}
        />
        <motion.div 
          className="w-6 h-0.5 bg-white absolute top-8 left-3"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -3 : 0 }}
        />
      </motion.button>
      
      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 backdrop-blur-md bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className="menu-container p-10">
                {menuItems.map((item, index) => (
                  <MenuItem 
                    key={index}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global styles for menu */}
      <style jsx global>{`
        .menu-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .menu-item {
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        
        .menu-item a:hover {
          text-shadow: 0 0 15px rgba(255,255,255,0.8);
        }
        
        .menu-item.active a {
          color: #f9a8d4;
          text-shadow: 0 0 10px rgba(249,168,212,0.6);
        }
      `}</style>
    </>
  );
}
