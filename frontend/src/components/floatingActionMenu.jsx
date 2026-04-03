import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoAdd, IoCopyOutline, IoDocumentTextOutline, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import cvPdf from '../assets/Anandhu_Kannan(WEB).pdf';

const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: <IoDocumentTextOutline size={20} />, 
      label: "Download CV", 
      href: cvPdf,
      download: "Anandhu_Kannan_CV.pdf"
    },
    { 
      icon: <IoLogoGithub size={20} />, 
      label: "GitHub", 
      href: "https://github.com/DevWithAnandhuKannan" 
    },
    { 
      icon: <IoLogoLinkedin size={20} />, 
      label: "LinkedIn", 
      href: "https://linkedin.com/in/anandhu-kannan" 
    },
    { 
      icon: <IoCopyOutline size={20} />, 
      label: "Copy Email", 
      onClick: () => {
        navigator.clipboard.writeText("connect.anandhukannan@gmail.com");
      }
    }
  ];

  const menuVariants = {
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
    closed: { opacity: 0, y: 20, scale: 0.8 }
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-end gap-3"
          >
            {actions.map((action, i) => (
              <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs font-medium tracking-wide font-sans text-white/80 whitespace-nowrap shadow-lg select-none">
                  {action.label}
                </span>
                
                {action.href ? (
                  <a 
                    href={action.href} 
                    target="_blank"
                    rel="noreferrer"
                    download={action.download}
                    className="w-12 h-12 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 pointer-events-auto cursor-pointer"
                  >
                    {action.icon}
                  </a>
                ) : (
                  <div 
                    onClick={action.onClick}
                    className="w-12 h-12 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-full flex items-center justify-center text-white/80 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:scale-105 pointer-events-auto cursor-pointer"
                  >
                    {action.icon}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform pointer-events-auto"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <IoAdd size={32} />
        </motion.div>
      </button>
    </div>
  );
};

export default FloatingActionMenu;
