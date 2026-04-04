import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { IoCodeSlashOutline, IoLayersOutline } from "react-icons/io5";

const projects = [
  {
    name: "AI Oral Cancer Detection System",
    description: "Built Swin UNet segmentation model achieving 92%+ detection accuracy on 500+ dental scans. Deployed on Raspberry Pi. Patent filed in collaboration with Annoor Dental College.",
    tech: "React, Node.js, PyTorch, Flask, OpenCV",
    link: "https://github.com/DevWithAnandhuKannan/DentalCollegeProject"
  },
  {
    name: "Hangout — Real-Time Social Platform",
    description: "Built social platform with real-time chat, video calls, notifications, and rankings. Implemented Socket.io WebSocket layer.",
    tech: "React.js, Node.js, Socket.io",
    link: "https://github.com/DevWithAnandhuKannan/"
  },
  {
    name: "AI Mock Interview Platform",
    description: "AI interview platform evaluating technical and HR modules using local LLMs for zero-cost generation and adaptive difficulty scoring.",
    tech: "React.js, Node.js, MongoDB, Ollama",
    link: "https://github.com/DevWithAnandhuKannan/"
  },
  {
    name: "Car Rental App & Damage Detection",
    description: "Car rental platform integrated with Hugging Face CV models for automated vehicle damage detection, reducing inspection time by 70%.",
    tech: "Django, React, MySQL, AI",
    link: "https://github.com/DevWithAnandhuKannan/car_rental_app"
  },
  {
    name: "Security Vulnerability Assessment",
    description: "Conducted extensive penetration testing on authorized environments identifying critical SQLi, XSS flaws. Documented via OWASP Top 10.",
    tech: "Burp Suite, OWASP ZAP, Nmap",
    link: "https://github.com/DevWithAnandhuKannan/"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="w-full bg-[#0a0a0a] text-white py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[100vw] px-6 sm:px-12 lg:px-40 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Select Work</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-wide text-white/90">
            Featured Projects
          </h2>
        </motion.div>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="w-full overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing px-6 sm:px-12 lg:px-40">
        <div className="flex gap-6 w-max">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col w-[320px] sm:w-[380px] bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex-shrink-0"
            >
              <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                <IoLayersOutline size={48} />
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-sm font-medium mb-3 text-white/90 group-hover:text-white transition-colors">
                  {project.name}
                </h3>
                <p className="text-[11px] text-white/40 leading-relaxed font-light mb-6">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-5 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4 text-[9px] text-white/30 font-mono tracking-widest uppercase flex-wrap">
                  <IoCodeSlashOutline size={10} />
                  <span>{project.tech}</span>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] text-white/50 hover:text-white font-medium uppercase tracking-widest transition-colors"
                  >
                    View Source <IoIosArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;