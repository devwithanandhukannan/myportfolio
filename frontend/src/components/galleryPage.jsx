import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import img1 from '../assets/gallery/anandhu-kannan-ceh-ethical-hacker.webp';
import img2 from '../assets/gallery/anandhu-kannan-mca-fisat-profile.webp';
import img3 from '../assets/gallery/anandhu-kannan-software-developer-profile.webp';
import img4 from '../assets/gallery/ceh-certified-ethical-hacker-anandhu-kannan.webp';
import img5 from '../assets/gallery/cybersecurity-testing-environment-anandhu-kannan.webp';
import img6 from '../assets/gallery/kerala-software-developer-anandhu-kannan.webp';

const photos = [
  { id: 1, src: img1, alt: "Anandhu Kannan - CEH Ethical Hacker", caption: "Certified Ethical Hacker (CEH v13) - Deep dive into cybersecurity." },
  { id: 2, src: img2, alt: "Anandhu Kannan - MCA FISAT Profile", caption: "Pursuing MCA at FISAT - Shaping the future of computing." },
  { id: 3, src: img3, alt: "Anandhu Kannan - Software Developer Profile", caption: "Full Stack Developer - Building scalable web applications." },
  { id: 4, src: img4, alt: "CEH Certified Ethical Hacker - Anandhu Kannan", caption: "Cybersecurity Expert - Protecting digital assets." },
  { id: 5, src: img5, alt: "Cybersecurity Testing Environment", caption: "Home Lab - Where the magic of security testing happens." },
  { id: 6, src: img6, alt: "Kerala Software Developer - Anandhu Kannan", caption: "Developing from the heart of Kerala - Global impact." },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 sm:px-12 lg:px-40">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white/90">Visual Journey</h1>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono mt-2">Snapshot of my professional & personal life</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-4 sm:gap-6">
          {[
            { number: photos.length, label: 'Posts' },
            { number: '1k+', label: 'Impact' },
            { number: 'CEH', label: 'Certified' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <p className="text-base sm:text-lg font-medium text-white/90">{stat.number}</p>
              <p className="text-[8px] text-white/40 uppercase tracking-widest font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedImage(photo)}
            className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl border border-white/5 hover:border-white/15 bg-[#111] transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <Maximize2 size={24} className="text-white/70" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-all border border-white/10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={20} />
            </motion.button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-[70vh]">
                {/* Image Section */}
                <div className="flex items-center justify-center bg-black/50 p-4 sm:p-8">
                  <motion.img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full max-h-[60vh] object-contain rounded-lg"
                  />
                </div>

                {/* Info Section */}
                <div className="p-6 sm:p-8 bg-[#111] border-l border-white/5 flex flex-col justify-between">
                  {/* Profile */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-sm">
                        AK
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/90">Anandhu Kannan</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest font-mono">@kneazlle</p>
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="space-y-4">
                      <p className="text-sm text-white/70 leading-relaxed font-light">
                        {selectedImage.caption}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {['Cybersecurity', 'Fullstack', 'Innovation'].map((tag, i) => (
                          <span key={i} className="text-[8px] text-white/30 font-mono uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-6 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/40 hover:text-red-500 transition-colors"
                      >
                        <Heart size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <MessageCircle size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <Share2 size={18} />
                      </motion.button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-white/60">128 likes</p>
                      <p className="text-[8px] text-white/30 uppercase tracking-wider">
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-24 text-center border-t border-white/5 pt-12"
      >
        <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-mono">End of Feed</p>
      </motion.div>
    </div>
  );
}