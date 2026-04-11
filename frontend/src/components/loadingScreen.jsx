import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [logs, setLogs] = useState([]);
  const [percent, setPercent] = useState(0);

  const initialLogs = [
    "INITIALIZING KERNEL...",
    "MOUNTING SECURE PORTFOLIO FILESYSTEM",
    "VERIFYING CEH v13 CREDENTIALS",
    "LOAD: AI ORAL CANCER DETECTION MODELS",
    "DECRYPTING FULL STACK DEPENDENCIES",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progress = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progress);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => clearInterval(progress);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-[#0f0] font-mono p-6 sm:p-12 text-xs sm:text-sm flex flex-col justify-end pointer-events-none">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <h2 className="text-4xl sm:text-6xl font-bold mb-2 tracking-tighter opacity-80">ANTIGRAVITY</h2>
          <p className="opacity-50">ANANDHU KANNAN SECURE PORTFOLIO TERMINAL v3.0</p>
        </div>
        
        <div className="h-48 overflow-hidden mb-6 flex flex-col justify-end">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-1"
              >
                <span className="opacity-50 mr-2">{'>'}</span> {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full h-1 bg-neutral-900 overflow-hidden">
          <motion.div 
            className="h-full bg-[#0f0]"
            initial={{ width: "0%" }}
            animate={{ width: `${percent}%` }}
          />
        </div>
        <div className="text-right mt-2 opacity-50">
          [{percent > 100 ? 100 : percent}%] SYSTEM BOOT
        </div>
      </div>
    </div>
  );
}
