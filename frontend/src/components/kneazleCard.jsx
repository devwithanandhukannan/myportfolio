import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Kneazle = () => {
  const textRef = useRef(null);
  const [isScrambling, setIsScrambling] = useState(false);
  const [finished, setFinished] = useState(false);

  const finalText = "KNZLE";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}<>?/";

  const scrambleText = () => {
    let iterations = 0;

    const interval = setInterval(() => {
      if (!textRef.current) return;

      textRef.current.innerText = finalText
        .split("")
        .map((letter, index) => {
          if (index < iterations) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      iterations += 0.4;

      if (iterations >= finalText.length) {
        clearInterval(interval);
        textRef.current.innerText = finalText;
      }
    }, 50);

    // stop after 3 seconds
    setTimeout(() => {
      setIsScrambling(false);
      setFinished(true);
    }, 3000);
  };

  const handleViewportEnter = () => {
    if (!isScrambling && !finished) {
      setIsScrambling(true);
      scrambleText();
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-24 overflow-hidden bg-black">
      
      {/* Dot texture */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1.2px,transparent_0)] 
        [background-size:14px_14px]" 
      />

      {/* Powered by */}
      <p className="relative z-10 text-gray-400 text-sm mb-4 tracking-wide">
        powered by
      </p>

      {/* Text */}
      <motion.h1
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`
          relative z-10 font-normal tracking-widest text-center
          text-4xl sm:text-6xl md:text-7xl lg:text-8xl
          ${isScrambling ? "text-transparent bg-clip-text animate-[wave_3s_ease-in-out_infinite]" : ""}
          ${finished ? "text-white" : ""}
        `}
        style={
          isScrambling
            ? {
                backgroundImage:
                  "linear-gradient(90deg,#facc15,#ef4444,#3b82f6,#facc15)",
                backgroundSize: "300% 100%",
              }
            : {}
        }
      >
        <span ref={textRef}>KNZLE</span>
      </motion.h1>

      {/* Glow */}
      <div className="absolute w-[220px] h-[220px] bg-white/5 blur-3xl rounded-full" />

      {/* Wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};