import { motion } from "framer-motion";
import { IoCodeSlash, IoShieldCheckmark, IoHardwareChip, IoPhonePortrait } from "react-icons/io5";

const services = [
  {
    icon: <IoCodeSlash size={36} />,
    title: "Full Stack Development",
    description: "Building scalable and performant enterprise web applications using MERN stack, Django, and microservices.",
  },
  {
    icon: <IoShieldCheckmark size={36} />,
    title: "Cybersecurity & Ethical Hacking",
    description: "Vulnerability assessment, penetration testing, and security event monitoring using SIEM tools like QRadar and Splunk.",
  },
  {
    icon: <IoHardwareChip size={36} />,
    title: "AI / ML Solutions",
    description: "Designing intelligent predictive models and computer vision systems using PyTorch and Scikit-learn.",
  },
  {
    icon: <IoPhonePortrait size={36} />,
    title: "Mobile App Development",
    description: "Developing cross-platform mobile experiences focusing on seamless UI and backend integrations.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

const Services = () => {
  return (
    <section id="services" className="w-full bg-[#0a0a0a] text-white px-6 sm:px-12 lg:px-40 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/20"></div>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">Capabilities</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-light mb-4 tracking-wide text-white/90">
            Services & Expertise
          </h2>
          <p className="text-white/50 max-w-2xl font-light">
            Bringing together robust software engineering with deep cybersecurity knowledge to deliver secure, AI-powered digital solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-[#111] overflow-hidden rounded-3xl border border-white/5 p-8 sm:p-10 hover:border-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 mb-6 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-medium mb-3 text-white/90 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed font-light group-hover:text-white/70 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
