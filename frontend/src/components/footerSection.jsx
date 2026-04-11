import React from "react";
import { 
  IoLogoGithub, 
  IoLogoLinkedin, 
  IoLogoInstagram, 
  IoArrowForwardOutline,
  IoCopyOutline,
  IoMapOutline,
  IoMailOutline
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-[#0a0a0a] text-white pt-24 pb-12 px-6 sm:px-12 lg:px-40 relative overflow-hidden border-t border-white/5">
      {/* Huge Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[15vw] font-bold leading-none tracking-tighter whitespace-nowrap">
          ANANDHU
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 mb-24">
          
          {/* Main CTA */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[9px] uppercase tracking-widest font-mono text-white/60">Available for new opportunities</span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-light mb-6 text-white/90 leading-tight">
              Let's build the next <br /> <span className="font-medium text-white">big thing.</span>
            </h2>
            
            <a 
              href="mailto:connect.anandhukannan@gmail.com"
              className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all"
            >
              Start a conversation <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Quick links & support right side */}
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-20">
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-4">Sitemap</p>
              <ul className="space-y-3">
                <li><a href="#about" className="text-xs text-white/60 hover:text-white transition-colors">About Me</a></li>
                <li><a href="#services" className="text-xs text-white/60 hover:text-white transition-colors">Services</a></li>
                <li><a href="#projects" className="text-xs text-white/60 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#testimonies" className="text-xs text-white/60 hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-4">Connect</p>
              <ul className="space-y-3">
                <li><a href="https://github.com/devwithanandhukannan" target="_blank" rel="noreferrer" className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"><IoLogoGithub/> GitHub</a></li>
                <li><a href="https://linkedin.com/in/anandhu-kannan" target="_blank" rel="noreferrer" className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"><IoLogoLinkedin/> LinkedIn</a></li>
                <li><a href="https://www.instagram.com/kneazllle/" className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"><IoLogoInstagram/> Instagram</a></li>
                <li><a href="mailto:connect.anandhukannan@gmail.com" className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-2"><IoMailOutline/> Email</a></li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-4">Support</p>
              <div className="p-2 border border-white/5 rounded-xl bg-white/[0.02] hover:border-white/20 hover:bg-white/5 transition-all w-24 flex flex-col items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/devwithanandhukannan/tempimages/main/anandhu_upi_qr.png"
                  alt="Scan UPI QR"
                  className="w-16 h-16 object-contain rounded-md opacity-70 hover:opacity-100 transition-opacity"
                />
                <span className="text-[8px] uppercase tracking-widest text-white/30 text-center">Scan UPI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">
              © {new Date().getFullYear()} Anandhu Kannan.
            </span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono hidden sm:inline-flex items-center gap-1">
              <IoMapOutline/> Kerala, India.
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-white/40 hover:text-white/80 cursor-pointer transition-colors" onClick={() => navigator.clipboard.writeText("connect.anandhukannan@gmail.com")}>
            <span className="text-[10px] uppercase font-mono tracking-widest">Copy Email</span>
            <IoCopyOutline size={12} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;