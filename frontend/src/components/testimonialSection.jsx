import React from "react";
import { motion } from "framer-motion";
import { IoStarOutline } from "react-icons/io5";

const testimonies = [
  {
    name: "Dr. Sarah Mathews",
    role: "Medical Researcher",
    experience: "Anandhu's work on the oral biopsy detection system was groundbreaking. His AI implementation has significantly reduced our analysis latency with impressive accuracy.",
  },
  {
    name: "James Carter",
    role: "Technical Lead",
    experience: "A brilliant Full Stack engineer. The microservices architecture he designed for our e-commerce platform handled our peak traffic flawlessly.",
  },
  {
    name: "Priya Ramesh",
    role: "Operations Manager",
    experience: "We hired Anandhu for penetration testing. Not only did he uncover critical vulnerabilities, but his remediation roadmap was exceptionally clear and actionable.",
  },
  {
    name: "David Chen",
    role: "Project Manager",
    experience: "Delivered our real-time social platform ahead of schedule. The WebSocket implementation is robust, and the modular codebase shows extreme attention to detail.",
  },
  {
    name: "Aisha Rahman",
    role: "Startup Founder",
    experience: "The AI mock interview platform exceeded expectations. His ability to fuse cutting-edge local LLMs into a seamless React front-end is truly top tier.",
  },
  {
    name: "Michael Torres",
    role: "Lead Engineer",
    experience: "An absolute professional. Implemented deep learning damage detection models cleanly, saving us manual inspection hours while maintaining high code quality.",
  }
];

// Futuristic Marquee Animation
const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 35,
        ease: "linear",
      },
    },
  },
};

const Testimonies = () => {
  return (
    <section
      id="testimonies"
      className="w-full bg-[#0a0a0a] text-white py-24 border-t border-white/5 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-3xl rounded-[100%] pointer-events-none"></div>

      <div className="max-w-[100vw] px-6 sm:px-12 lg:px-40 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Feedback</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-white/90">
            Client Testimonials
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap mt-4">
        {/* Left Gradient Overlay for fading effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>

        <motion.div
          className="flex space-x-6 px-6"
          variants={marqueeVariants}
          animate="animate"
        >
          {/* We duplicate the array to create an infinite scroll illusion */}
          {[...testimonies, ...testimonies].map((testimonial, index) => (
            <div
              key={index}
              className="relative group bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 w-[300px] sm:w-[350px] flex-shrink-0 flex flex-col whitespace-normal will-change-transform"
            >
              {/* Glowing futuristic border effect */}
              <div className="absolute -inset-px bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-[1px] pointer-events-none"></div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStarOutline key={i} className="text-white/20 group-hover:text-white/80 transition-colors" size={12} />
                ))}
              </div>

              <blockquote className="text-[11px] text-white/50 leading-relaxed font-light mb-6 flex-1 italic">
                "{testimonial.experience}"
              </blockquote>
              
              <div className="mt-auto border-t border-white/5 pt-4">
                <p className="text-xs text-white/90 font-medium tracking-wide">{testimonial.name}</p>
                <p className="text-[9px] uppercase tracking-widest font-mono text-white/30 mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonies;
