import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate network request for 1.5s
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000); // Reset after 5s
    }, 1500);
    
    // Trigger mailto fallback
    const subject = `Portfolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:connect.anandhukannan@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full bg-[#0a0a0a] text-white py-24 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[100vw] px-6 sm:px-12 lg:px-40 mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest">Get In Touch</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide text-white/90">
            Start a Conversation
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-medium text-white/90 mb-2 tracking-wide">Connect</h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                Have a question or want to collaborate? Reach out and let's create something great together.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Email */}
              <a 
                href="mailto:connect.anandhukannan@gmail.com"
                className="group flex items-start gap-4 p-4 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-0.5 text-white/40 group-hover:text-white/60 transition-colors">
                  <Mail size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm text-white/70 group-hover:text-white transition-colors break-all">
                    connect.anandhukannan@gmail.com
                  </p>
                </div>
              </a>

              

              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-lg border border-white/5">
                <div className="flex-shrink-0 mt-0.5 text-white/40">
                  <MapPin size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mb-1">Location</p>
                  <p className="text-sm text-white/70">
                    Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="bg-[#111] border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-white/10 transition-all duration-300"
            >
              <div className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                    disabled={formStatus !== 'idle'}
                    placeholder="Your name"
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus !== 'idle'}
                    placeholder="your@email.com"
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus !== 'idle'}
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={formStatus !== 'idle'}
                  className="w-full bg-white text-black hover:bg-white/90 font-medium rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-6 group text-sm"
                >
                  {formStatus === 'idle' && (
                    <>
                      Send Message
                      <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                  {formStatus === 'submitting' && (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  )}
                  {formStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={16} />
                      Message Sent
                    </div>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}