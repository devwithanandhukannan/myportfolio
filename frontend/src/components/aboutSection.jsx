import { useState } from "react";
import {
  Code, Database, Palette, Smartphone, Zap, Award, GraduationCap, Briefcase, Star, Map, Book, Brush, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/me.png";

const categories = ["All", "Frontend", "Backend", "Database", "Mobile", "Security", "AI/ML"];

const techStack = [
  { name: "React.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "C++ / C", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "Python", category: "AI/ML" },
  { name: "MongoDB", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Burp Suite", category: "Security" },
  { name: "Nmap / Metasploit", category: "Security" },
  { name: "Docker", category: "Backend" },
];

const dataStructures = {
    education: {
        title: "Education",
        subtitle: "Academic Journey",
        icon: <GraduationCap className="w-3 h-3 md:w-4 md:h-4" />,
        children: [
            { title: "MCA", subtitle: "FISAT, Angamaly (2025)" },
            { title: "PG Diploma", subtitle: "Blockchain, IIITM-K" },
            { title: "BCA", subtitle: "NSS College (2020-2023)" },
        ]
    },
    life: {
        title: "Life & Hobbies",
        subtitle: "Personal Pursuits",
        icon: <Compass className="w-3 h-3 md:w-4 md:h-4" />,
        children: [
            { title: "Solo Travel", subtitle: "Exploring the world" },
            { title: "Reading Books", subtitle: "Continuous learning" },
            { title: "Painting", subtitle: "Creative expression" },
            { title: "Introverted Explorer", subtitle: "Reflective observations" }
        ]
    },
    experience: {
        title: "Experience",
        subtitle: "Professional Record",
        icon: <Briefcase className="w-3 h-3 md:w-4 md:h-4" />,
        children: [
            { title: "Apply Goat", subtitle: "Full Stack Dev (2023-2024)" },
            { title: "Freelance", subtitle: "10+ Apps (2022-Pres)" },
            { title: "Student Mentor", subtitle: "FISAT (2024-2025)" }
        ]
    },
    security: {
        title: "Sec & Data",
        subtitle: "Cybersecurity & Automation",
        icon: <Zap className="w-3 h-3 md:w-4 md:h-4" />,
        children: [
            { title: "Ethical Hack Intern", subtitle: "HackerSchool (2025)" },
            { title: "Data Science Intern", subtitle: "SMEC Auto (2024)" },
            { title: "Certifications", subtitle: "CEH v13, MITRE" }
        ]
    }
};

const TreeNodeRight = ({ node, depth = 1, idx = 0 }) => {
  const hasChildren = node.children && node.children.length > 0;
  const numChildren = hasChildren ? node.children.length : 0;
  
  // Algorithmic irregular delay based on title length and depth, giving a growing, popping feel
  const delay = depth * 0.3 + (node.title.length % 5) * 0.15;

  return (
    <div className="flex flex-row items-stretch justify-center">
      <div className="flex flex-col justify-center relative z-10 shrink-0 py-1 md:py-3 cursor-default">
        <motion.div 
            initial={{ opacity: 0, scale: 0 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true, margin: "-10px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: delay }}
            className="p-3 md:p-4 bg-[#111] border border-white/5 rounded-xl md:rounded-2xl hover:border-[#ef4444]/60 hover:bg-[#1a1a1a] transition-all whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-center min-w-[120px] md:min-w-[190px]"
        >
            {node.icon && <div className="mb-1 md:mb-2 text-white/40">{node.icon}</div>}
            <h3 className="font-medium text-[9px] md:text-[11px] text-white/90">{node.title}</h3>
            {node.subtitle && <p className="text-[7px] md:text-[8px] uppercase font-mono tracking-widest mt-0.5 md:mt-1 text-white/40 max-w-[100px] md:max-w-[160px] truncate">{node.subtitle}</p>}
        </motion.div>
      </div>
      
      {hasChildren && (
        <>
            <div className="w-6 md:w-12 relative shrink-0">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {node.children.map((child, i) => {
                        const y = (100 / numChildren) * (i + 0.5);
                        const pathDelay = delay + 0.2 + (i * 0.1);
                        return (
                          <motion.path 
                            key={i} 
                            d={`M 0 50 C 50 50, 50 ${y}, 100 ${y}`} 
                            stroke="#ef4444" 
                            vectorEffect="non-scaling-stroke" 
                            strokeWidth="2" 
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeInOut", delay: pathDelay }}
                          />
                        );
                    })}
                </svg>
            </div>
            <div className="flex flex-col justify-around shrink-0 h-full">
                {node.children.map((child, i) => (
                    <TreeNodeRight key={i} node={child} depth={depth + 1} idx={i} />
                ))}
            </div>
        </>
      )}
    </div>
  );
};

const TreeNodeLeft = ({ node, depth = 1, idx = 0 }) => {
  const hasChildren = node.children && node.children.length > 0;
  const numChildren = hasChildren ? node.children.length : 0;
  
  const delay = depth * 0.3 + (node.title.length % 5) * 0.15;

  return (
    <div className="flex flex-row-reverse items-stretch justify-center">
      <div className="flex flex-col justify-center relative z-10 shrink-0 py-1 md:py-3 cursor-default">
        <motion.div 
            initial={{ opacity: 0, scale: 0 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true, margin: "-10px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: delay }}
            className="p-3 md:p-4 bg-[#111] border border-white/5 rounded-xl md:rounded-2xl hover:border-[#ef4444]/60 hover:bg-[#1a1a1a] transition-all whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col items-end text-right min-w-[120px] md:min-w-[190px]"
        >
            {node.icon && <div className="mb-1 md:mb-2 text-white/40 flex justify-end">{node.icon}</div>}
            <h3 className="font-medium text-[9px] md:text-[11px] text-white/90">{node.title}</h3>
            {node.subtitle && <p className="text-[7px] md:text-[8px] uppercase font-mono tracking-widest mt-0.5 md:mt-1 text-white/40 max-w-[100px] md:max-w-[160px] truncate">{node.subtitle}</p>}
        </motion.div>
      </div>
      
      {hasChildren && (
        <>
            <div className="w-6 md:w-12 relative shrink-0">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {node.children.map((child, i) => {
                        const y = (100 / numChildren) * (i + 0.5);
                        const pathDelay = delay + 0.2 + (i * 0.1);
                        return (
                          <motion.path 
                            key={i} 
                            d={`M 100 50 C 50 50, 50 ${y}, 0 ${y}`} 
                            stroke="#ef4444" 
                            vectorEffect="non-scaling-stroke" 
                            strokeWidth="2" 
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeInOut", delay: pathDelay }}
                          />
                        );
                    })}
                </svg>
            </div>
            <div className="flex flex-col justify-around shrink-0 h-full">
                {node.children.map((child, i) => (
                    <TreeNodeLeft key={i} node={child} depth={depth + 1} idx={i} />
                ))}
            </div>
        </>
      )}
    </div>
  );
};

const About = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStack = activeCategory === "All"
    ? techStack
    : techStack.filter(tech => tech.category === activeCategory);

  const leftNodes = [dataStructures.education, dataStructures.life];
  const rightNodes = [dataStructures.experience, dataStructures.security];

  return (
    <div id="about" className="w-full bg-[#0a0a0a] text-white px-4 sm:px-12 lg:px-12 xl:px-40 py-24 min-h-screen overflow-hidden">
      <div className="max-w-[100rem] mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center flex flex-col items-center max-w-4xl mx-auto"
        >


          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/60">Open to Relocation (India)</span>
          </div>
            
          <h1 className="text-4xl sm:text-6xl font-light mb-6 tracking-tight text-white/90">
            About Me
          </h1>
          <p className="text-white/50 text-sm sm:text-base font-light leading-relaxed">
            I'm <span className="text-white/90 font-medium">Anandhu Kannan</span>, a Full Stack Developer & CEH v13 with 3+ years of experience delivering 10+ production applications. I specialize in the MERN stack, Django, and scalable microservices across healthcare, e-commerce, and education.
          </p>
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-24 md:mb-32 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-widest transition-all duration-300 border ${
                  activeCategory === category
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <AnimatePresence mode="popLayout">
              {filteredStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="px-3 md:px-4 py-2 bg-[#111] border border-white/5 rounded-lg text-[10px] md:text-xs text-white/60 font-light hover:text-white hover:border-white/20 transition-colors"
                >
                  {tech.name}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* The True Mind Map Horizontal Tree (Centered Radial) */}
        <div className="mb-20">
          <h2 className="text-2xl font-light text-center mb-10 md:mb-16 text-white/80 tracking-wide">
            The Ecosystem of Me
          </h2>

          <div className="w-full overflow-x-auto pb-12 scrollbar-hide flex justify-start md:justify-center">
             {/* We apply a massive negative margin on mobile wrapper if needed to ensure centering, but since it scrolls, we just need padding */}
             <div className="flex flex-row items-stretch justify-center relative min-w-max py-8 px-8 md:px-4">
                
                {/* Left side branches */}
                <div className="flex flex-col justify-around shrink-0 relative h-full">
                   {leftNodes.map((node, i) => (
                       <TreeNodeLeft key={i} node={node} depth={1} idx={i} />
                   ))}
                </div>

                {/* Left Root connection SVG (The Gap) */}
                <div className="w-8 md:w-16 relative shrink-0">
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                       {leftNodes.map((_, i) => {
                           const y = (100 / leftNodes.length) * (i + 0.5);
                           return (
                             <motion.path 
                               key={i} 
                               d={`M 100 50 C 50 50, 50 ${y}, 0 ${y}`} 
                               stroke="#ef4444" 
                               vectorEffect="non-scaling-stroke" 
                               strokeWidth="2" 
                               fill="none"
                               initial={{ pathLength: 0, opacity: 0 }}
                               whileInView={{ pathLength: 1, opacity: 1 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 + (i * 0.1) }}
                             />
                           );
                       })}
                   </svg>
                </div>

                {/* Center Root Node */}
                <div className="flex flex-col justify-center relative z-20 shrink-0 cursor-default">
                    <motion.div 
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white text-black rounded-2xl md:rounded-3xl border-[4px] md:border-[6px] border-[#0a0a0a] shadow-[0_0_60px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    >
                        <h3 className="text-base sm:text-lg md:text-2xl font-bold text-center leading-tight">Anandhu</h3>
                        <p className="text-[7px] md:text-[10px] uppercase font-mono tracking-widest mt-1 md:mt-2 opacity-60">Creator</p>
                    </motion.div>
                </div>

                {/* Right Root connection SVG (The Gap) */}
                <div className="w-8 md:w-16 relative shrink-0">
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                       {rightNodes.map((_, i) => {
                           const y = (100 / rightNodes.length) * (i + 0.5);
                           return (
                             <motion.path 
                               key={i} 
                               d={`M 0 50 C 50 50, 50 ${y}, 100 ${y}`} 
                               stroke="#ef4444" 
                               vectorEffect="non-scaling-stroke" 
                               strokeWidth="2" 
                               fill="none"
                               initial={{ pathLength: 0, opacity: 0 }}
                               whileInView={{ pathLength: 1, opacity: 1 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 + (i * 0.1) }}
                             />
                           );
                       })}
                   </svg>
                </div>

                {/* Right side branches */}
                <div className="flex flex-col justify-around shrink-0 relative h-full">                 
                   {rightNodes.map((node, i) => (
                       <TreeNodeRight key={i} node={node} depth={1} idx={i} />
                   ))}
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;