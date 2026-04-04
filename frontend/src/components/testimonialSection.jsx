import React from "react";
import { motion } from "framer-motion";
import { IoStarOutline } from "react-icons/io5";

import {testimonies} from "../data/testimonials"

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
