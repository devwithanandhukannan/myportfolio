import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

export default function CertificationsSection() {
  const certs = [
    "CEH v13 — Certified Ethical Hacker",
    "MITRE ATT&CK - "
  ];

  return (
    <section id="certifications" className="w-full bg-[#0a0a0a] text-white py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[100vw] px-6 sm:px-12 lg:px-40 mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Credentials</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-white/90">
            Certifications
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {certs.map((cert, index) => {
            const [title, issuer] = cert.split(" — ");
            const isSecurityCert = title.includes("CEH");
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex items-start gap-4 p-5 bg-[#111] rounded-lg border border-white/5 hover:border-white/15 transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {isSecurityCert ? (
                    <Award size={18} className="text-white/40 group-hover:text-white/60 transition-colors" />
                  ) : (
                    <CheckCircle size={18} className="text-white/40 group-hover:text-white/60 transition-colors" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors mb-1">
                    {title}
                  </h3>
                  <p className="text-[11px] text-white/40 font-light mb-3">
                    {issuer}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
                    <span className="text-[8px] text-white/30 font-mono uppercase tracking-wider">Active</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}