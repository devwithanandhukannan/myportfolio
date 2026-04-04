import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { articles } from '../data/articles';
export default function BlogSection() {

  return (
    <section id="insights" className="w-full bg-[#0a0a0a] text-white py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[100vw] px-6 sm:px-12 lg:px-40 mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/20"></div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Articles</p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-wide text-white/90">
              Latest Insights
            </h2>
          </div>

          <motion.a
            href="https://medium.com/@anandhukannan"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden md:flex items-center gap-2 text-white/50 hover:text-white font-medium text-[10px] uppercase tracking-widest transition-colors group"
          >
            View All
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="w-full overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing px-6 sm:px-12 lg:px-40">
        <div className="flex gap-6 w-max">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col w-[320px] sm:w-[380px] bg-[#111] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex-shrink-0"
            >
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-5 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <BookOpen size={48} />
              </div>

              <div className="relative z-10 flex-1">
                {/* Date & Read Time */}
                <div className="flex items-center gap-3 mb-4 text-[9px] text-white/30 font-mono tracking-widest uppercase flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar size={10} />
                    <span>{article.date}</span>
                  </div>
                  <span className="text-white/15">•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{article.readTime} read</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium mb-3 text-white/90 group-hover:text-white transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[11px] text-white/40 leading-relaxed font-light mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Tags & Link */}
              <div className="relative z-10 mt-auto pt-5 border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="text-[8px] text-white/20 font-mono tracking-wider uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] text-white/50 hover:text-white font-medium uppercase tracking-widest transition-colors"
                >
                  Read Article
                  <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.a>
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
}