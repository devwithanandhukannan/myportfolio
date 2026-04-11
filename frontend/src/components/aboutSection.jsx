import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Code, Database, Award, GraduationCap,
  Briefcase, Compass, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mindmapData from '../data/mindmapData.json';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Mobile', 'Security', 'AI/ML'];

const techStack = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Django', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'C++ / C', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'Python', category: 'AI/ML' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Burp Suite', category: 'Security' },
  { name: 'Nmap / Metasploit', category: 'Security' },
  { name: 'Docker', category: 'Backend' },
];

// ==========================================
// Branch Card - Self-contained with children
// ==========================================
const BranchCard = ({ branch, side, isExpanded, onToggle }) => {
  const hasChildren = branch.children && branch.children.length > 0;

  return (
    <div className={`flex items-center ${side === 'left' ? 'flex-row-reverse' : 'flex-row'} gap-6`}>
      {/* Branch Node */}
      <button
        data-mind-node={branch.key}
        onClick={() => hasChildren && onToggle(branch.key)}
        className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 shrink-0 cursor-pointer ${
          isExpanded
            ? 'bg-[#161616] border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-[#111] border-white/8 hover:border-white/15 hover:bg-[#151515]'
        }`}
      >
        {side === 'left' && hasChildren && (
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={14} className="text-white/40 rotate-180" />
          </motion.div>
        )}

        <div className={`flex flex-col ${side === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
          <div className={`flex items-center gap-2 mb-0.5 ${side === 'left' ? 'flex-row-reverse' : ''}`}>
            {branch.icon && <span className="text-white/40">{branch.icon}</span>}
            <span className="text-[11px] font-medium text-white/85">{branch.title}</span>
          </div>
          <span className="text-[7px] uppercase font-mono tracking-widest text-white/35">{branch.subtitle}</span>
          {branch.isActive && (
            <div className={`flex items-center gap-1 mt-1 ${side === 'left' ? 'justify-end' : ''}`}>
              <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[6px] text-green-400 font-mono uppercase">Active</span>
            </div>
          )}
        </div>

        {side === 'right' && hasChildren && (
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={14} className="text-white/40" />
          </motion.div>
        )}
      </button>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, x: side === 'left' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: side === 'left' ? 20 : -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col gap-2"
          >
            {branch.children.map((child, i) => (
              <motion.div
                key={i}
                data-mind-node={`${branch.key}-${i}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                className={`px-3 py-2 rounded-lg bg-[#0d0d0d] border border-white/5 hover:border-white/12 transition-colors cursor-default ${
                  side === 'left' ? 'text-right' : 'text-left'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {child.isActive && <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse shrink-0"></span>}
                  <span className="text-[10px] font-medium text-white/70">{child.title}</span>
                </div>
                {child.subtitle && (
                  <p className="text-[7px] uppercase font-mono tracking-wider text-white/30 mt-0.5">{child.subtitle}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// Main About Component
// ==========================================
const About = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedNodes, setExpandedNodes] = useState({
    education: true,
    experience: true,
    interests: false,
    certifications: false,
  });
  const treeRef = useRef(null);
  const [paths, setPaths] = useState([]);

  const filteredStack = activeCategory === 'All'
    ? techStack
    : techStack.filter(tech => tech.category === activeCategory);

  const toggleNode = (key) => {
    setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const data = mindmapData;

  const renderIcon = (key) => {
    const icons = {
      education: <GraduationCap className="w-3.5 h-3.5" />,
      skills: <Code className="w-3.5 h-3.5" />,
      experience: <Briefcase className="w-3.5 h-3.5" />,
      certifications: <Award className="w-3.5 h-3.5" />,
      interests: <Compass className="w-3.5 h-3.5" />,
    };
    return icons[key] || null;
  };

  const branchesWithIcons = Object.entries(data.branches).map(([key, branch]) => ({
    key, ...branch, icon: renderIcon(key)
  }));

  const leftBranches = branchesWithIcons.filter(b => ['education', 'interests'].includes(b.key));
  const rightBranches = branchesWithIcons.filter(b => ['experience', 'certifications'].includes(b.key));

  // ==========================================
  // Pixel-Perfect Connector Measurement
  // ==========================================
  const calculatePaths = useCallback(() => {
    const container = treeRef.current;
    if (!container) return;

    const cr = container.getBoundingClientRect();
    const newPaths = [];

    const getBox = (id) => {
      const el = container.querySelector(`[data-mind-node="${id}"]`);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        l: r.left - cr.left,
        r: r.right - cr.left,
        cy: r.top + r.height / 2 - cr.top,
      };
    };

    const bezier = (sx, sy, ex, ey) => {
      const mx = (sx + ex) / 2;
      return `M ${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
    };

    const center = getBox('center');
    if (!center) return;

    // Left: center.left → branch.right, then branch.left → child.right
    leftBranches.forEach(branch => {
      const b = getBox(branch.key);
      if (!b) return;
      newPaths.push(bezier(center.l, center.cy, b.r, b.cy));

      if (expandedNodes[branch.key] && branch.children) {
        branch.children.forEach((_, i) => {
          const c = getBox(`${branch.key}-${i}`);
          if (!c) return;
          newPaths.push(bezier(b.l, b.cy, c.r, c.cy));
        });
      }
    });

    // Right: center.right → branch.left, then branch.right → child.left
    rightBranches.forEach(branch => {
      const b = getBox(branch.key);
      if (!b) return;
      newPaths.push(bezier(center.r, center.cy, b.l, b.cy));

      if (expandedNodes[branch.key] && branch.children) {
        branch.children.forEach((_, i) => {
          const c = getBox(`${branch.key}-${i}`);
          if (!c) return;
          newPaths.push(bezier(b.r, b.cy, c.l, c.cy));
        });
      }
    });

    setPaths(newPaths);
  }, [expandedNodes, leftBranches, rightBranches]);

  // Continuously recalculate during expand/collapse animations
  useEffect(() => {
    let frameId;
    let start = Date.now();
    const loop = () => {
      calculatePaths();
      if (Date.now() - start < 800) {
        frameId = requestAnimationFrame(loop);
      }
    };
    frameId = requestAnimationFrame(loop);
    window.addEventListener('resize', calculatePaths);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', calculatePaths);
    };
  }, [calculatePaths]);

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
          <h2 className="text-4xl sm:text-6xl font-light mb-6 tracking-tight text-white/90">About Me</h2>
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
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white/80'
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

        {/* ==========================================
            The Ecosystem of Me - NotebookLM Style
            ========================================== */}
        <div className="mb-20">
          <h2 className="text-2xl font-light text-center mb-3 text-white/80 tracking-wide">
            The Ecosystem of Me
          </h2>
          <p className="text-center text-[10px] uppercase font-mono tracking-widest text-white/30 mb-12">
            Click branches to expand · Scroll to explore
          </p>

          <div className="w-full overflow-x-auto pb-8 scrollbar-hide flex justify-start md:justify-center">
            <div
              ref={treeRef}
              className="relative min-w-max py-12 px-12 md:px-20"
              style={{
                backgroundImage: 'radial-gradient(rgba(136, 136, 136, 0.21) 1.5px, transparent 1.5px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* SVG Connector Overlay - Pixel-Perfect Measurement */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
                {paths.map((d, i) => (
                  <path
                    key={`path-${i}-${d.slice(0, 20)}`}
                    d={d}
                    stroke="rgba(255, 11, 11, 0.77)"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                    fill="none"
                  />
                ))}
              </svg>

              {/* Tree Layout */}
              <div className="flex items-center relative z-10">

                {/* Left Branches */}
                <div className="flex flex-col gap-8 shrink-0">
                  {leftBranches.map(branch => (
                    <BranchCard
                      key={branch.key}
                      branch={branch}
                      side="left"
                      isExpanded={expandedNodes[branch.key]}
                      onToggle={toggleNode}
                    />
                  ))}
                </div>

                {/* Gap left */}
                <div className="w-12 md:w-20 shrink-0" />

                {/* Center Node */}
                <motion.div
                  data-mind-node="center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 bg-white text-black rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.08)] flex flex-col items-center justify-center shrink-0 hover:scale-[1.02] transition-transform cursor-default"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center leading-tight">Anandhu</h3>
                  <p className="text-[8px] md:text-[10px] uppercase font-mono tracking-widest mt-1 md:mt-2 opacity-50">Creator</p>
                </motion.div>

                {/* Gap right */}
                <div className="w-12 md:w-20 shrink-0" />

                {/* Right Branches */}
                <div className="flex flex-col gap-8 shrink-0">
                  {rightBranches.map(branch => (
                    <BranchCard
                      key={branch.key}
                      branch={branch}
                      side="right"
                      isExpanded={expandedNodes[branch.key]}
                      onToggle={toggleNode}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;