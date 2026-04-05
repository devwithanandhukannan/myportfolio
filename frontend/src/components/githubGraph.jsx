import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GithubGraph() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full bg-black py-12 border-t border-gray-800">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm sm:text-sm font-semibold text-[#525252] text-center mb-8"
        >
          GitHub Contribution Graph
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-full flex justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
              </div>
            )}
            
            <motion.img
              src="https://raw.githubusercontent.com/devwithanandhukannan/devwithanandhukannan/output/github-snake-dark.svg"
              alt="GitHub Contribution Graph"
              onLoad={() => setImageLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}