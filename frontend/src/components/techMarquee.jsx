import { motion } from 'framer-motion';
import portfolioData from '../data/portfolioData';

export default function TechMarquee() {
  const allSkills = [
    ...portfolioData.technicalSkills.languages,
    ...portfolioData.technicalSkills.frontend,
    ...portfolioData.technicalSkills.backend,
    ...portfolioData.technicalSkills.databases,
    ...portfolioData.technicalSkills.devops,
    ...portfolioData.technicalSkills.aiMl,
    ...portfolioData.technicalSkills.security,
  ];

  // duplicate array to make seamless scrolling
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills];

  return (
    <div className="w-full bg-neutral-950 py-8 border-y border-neutral-900 overflow-hidden relative flex flex-col items-center">
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-neutral-950 to-transparent z-10" />


      <div className="w-full flex space-x-12 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap space-x-12"
        >
          {marqueeItems.map((skill, idx) => (
            <span
              key={idx}
              className="text-neutral-300 font-medium text-lg whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity hover:text-blue-400 cursor-default"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
