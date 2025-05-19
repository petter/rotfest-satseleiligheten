"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract background */}
      <div 
        className="fixed inset-0 opacity-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 z-0" 
        style={{
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      />
      
      {/* Parallax header */}
      <motion.div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <motion.h1 
          className="font-black text-6xl md:text-8xl text-white text-center px-4"
          style={{ 
            textShadow: "0 0 15px rgba(255,105,180,0.7)",
            y: scrollY * 0.5, 
          }}
        >
          Om Satseleiligheten
        </motion.h1>
        
        {/* Rainbow scroll indicator arrow */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ 
            y: [0, 10, 0], 
            opacity: scrollY > 100 ? 0 : 1 
          }}
          transition={{ 
            y: { duration: 1.5, repeat: Infinity },
            opacity: { duration: 0.3 }
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <defs>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="16.67%" stopColor="#FF7F00" />
                <stop offset="33.33%" stopColor="#FFFF00" />
                <stop offset="50%" stopColor="#00FF00" />
                <stop offset="66.67%" stopColor="#0000FF" />
                <stop offset="83.33%" stopColor="#4B0082" />
                <stop offset="100%" stopColor="#9400D3" />
              </linearGradient>
            </defs>
            <polyline points="6 9 12 15 18 9" stroke="url(#rainbow)" />
          </svg>
          <motion.div 
            className="text-white text-sm text-center font-bold mt-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.8)" }}
          >
            Sats nedover for å oppleve magien!
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-[-1]"
          style={{ y: scrollY * -0.2 }}
        >
          <div className="relative w-full h-full">
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -5, 0],
                  scale: [1, 1.05, 0.95, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 20,
                  ease: "easeInOut" 
                }}
              >
                <Image 
                  src="/gutta.jpg" 
                  alt="Gutta i aksjon" 
                  width={400} 
                  height={400}
                  className="rounded-lg shadow-2xl"
                  style={{ 
                    transform: `rotate(${Math.sin(scrollY * 0.01) * 10}deg)`,
                  }}
                />
              </motion.div>
            </div>
            
            <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 10, 0],
                  scale: [1, 0.95, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 15,
                  ease: "easeInOut" 
                }}
              >
                <Image 
                  src="/gutta2.jpg" 
                  alt="Gutta i aksjon" 
                  width={400} 
                  height={400}
                  className="rounded-lg shadow-2xl"
                  style={{ 
                    transform: `rotate(${Math.cos(scrollY * 0.01) * 10}deg)`,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Content section */}
      <div className="relative z-10 bg-black bg-opacity-70 backdrop-blur-md py-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <p className="text-xl md:text-2xl font-light leading-relaxed text-pink-200 mb-6">
              I hjertet av Rotfest ligger en leilighet som trosser alle konvensjonelle standarder. 
              En bolig så eksepsjonell, så fortryllende, så fullstendig banebrytende at den kun kan omtales som <strong>Satseleiligheten</strong>.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-6">
              Gutta bak denne arkitektoniske mesterverket er ikke vanlige menn – de er visjonære, genier, 
              kunstneriske sjeler med en teknisk presisjon som får selv de mest erfarne ingeniører til å måpe i beundring.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-6">
              Når du trer inn i Satseleiligheten, trer du ikke bare inn i et hjem – du trer inn i et levende kunstverk, 
              en manifesjon av det absolutt ypperste innen moderne design og teknologi.
            </p>
            
            <blockquote className="border-l-4 border-pink-500 pl-4 italic text-xl text-pink-300 my-8">
              &ldquo;Det finnes gode leiligheter, og så finnes det Satseleiligheten. Forskjellen er som natt og dag, 
              som vann og vin, som en Lada og en Lamborghini. Dette er ikke bare en leilighet – det er fremtidens bolig.&rdquo;
            </blockquote>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-purple-500 inline-block text-transparent bg-clip-text my-6">
              Gutta – De Utvalgte
            </h2>
            
            <p className="text-lg md:text-xl text-white mb-6">
              Hvem er disse legendene som har skapt Satseleiligheten? Et sammensveiset team av ekstraordinære talenter, 
              hver med sine unike ferdigheter som sammen skaper den perfekte symfonien av innovasjon.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-6">
              Med en blanding av presisjon, lidenskap, og en uslåelig sans for estetikk, har gutta skapt noe som overskrider 
              grensene for hva man trodde var mulig i boligarkitektur. Deres kompromissløse dedikasjon til kvalitet gjenspeiles 
              i hvert eneste aspekt av leiligheten – fra de skreddersydde møblene til den revolusjonerende smarthus-teknologien.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-6">
              La det være sagt: Dette er ikke bare gutter – dette er menn av kultur, menn av visjon, menn som forstår at 
              livet handler om mer enn bare å eksistere – det handler om å leve med stil, komfort og en touch av genialitet.
            </p>
            
            <div className="mt-12 text-center">
              <motion.h3 
                className="text-2xl font-bold text-white"
                animate={{ 
                  textShadow: ["0 0 10px rgba(255,0,255,0.5)", "0 0 20px rgba(0,255,255,0.5)", "0 0 10px rgba(255,255,0,0.5)", "0 0 10px rgba(255,0,255,0.5)"],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                Opplev Satseleiligheten – Rotfests Kronjuvel
              </motion.h3>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
