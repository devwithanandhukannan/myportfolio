import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import ParticleBackground from "./ParticleBackground.jsx";

export const HomeSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [displayedText, setDisplayedText] = useState("");
    const [showParticles, setShowParticles] = useState(false);
    const fullText = "ANANDHU KANNAN";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
                // Delay showing particles slightly after finishing typing for dramatic effect
                setTimeout(() => setShowParticles(true), 400);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section 
            id="home" 
            className="relative min-h-[95vh] flex items-center justify-center bg-[#0a0a0a] pt-20 px-6 sm:px-12 w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Custom Google IDX Particle Engine - Rendered only after typing for performance! */}
            {showParticles && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <ParticleBackground isHovered={isHovered} />
                </motion.div>
            )}

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-white/70 font-mono">Open to Opportunities</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-white text-5xl sm:text-7xl lg:text-[6rem] font-light tracking-tight leading-tight mb-8 flex items-center justify-center min-h-[1.2em]"
                >
                    {displayedText}
                    <span 
                       className={`inline-block w-[4px] sm:w-[6px] h-[0.9em] ml-2 animate-pulse bg-gradient-to-b from-[#4285f4] via-[#ea4335] to-[#fbbc05] transition-opacity duration-500 ${showParticles ? "opacity-0" : "opacity-100"}`}
                    ></span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-white/50 text-lg sm:text-xl font-light max-w-2xl leading-relaxed mb-12"
                >
                    Full Stack Developer & Certified Ethical Hacker (CEH v13). Specializing in scalable enterprise applications, secure system architecture, and AI-driven solutions across healthcare, e-commerce, and education.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
                    onMouseEnter={() => setIsHovered(true)}
                >
                    <a 
                        href="#projects"
                        className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full font-medium transition-all duration-300"
                    >
                        View Projects 
                        <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                        href="#contact"
                        className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-full font-medium transition-all duration-300"
                    >
                        Contact Me
                    </a>
                </motion.div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
                >
                    <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};