import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: "01",
    title: "AI Development",
    desc: "Custom ML models, NLP pipelines, computer vision systems, and AI-powered feature integration for modern applications."
  },
  {
    num: "02",
    title: "Machine Learning",
    desc: "End-to-end data analysis, model training, prediction systems, and robust model deployment to production."
  },
  {
    num: "03",
    title: "Flutter Apps",
    desc: "High-performance cross-platform mobile applications for iOS & Android with beautiful, responsive UI."
  },
  {
    num: "04",
    title: "Full Stack Web",
    desc: "Scalable web applications with React/Next.js frontends, powerful Node.js backends, and efficient databases."
  },
  {
    num: "05",
    title: "REST APIs",
    desc: "Secure, scalable, and well-documented API design and implementation for seamless system integration."
  },
  {
    num: "06",
    title: "Python Automation",
    desc: "Intelligent scripts, bots, automated data processing pipelines, and workflow optimizations."
  }
];

export function Services() {
  return (
    <SectionWrapper id="services">
      <motion.div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="section-label">[04] SERVICES</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4 max-w-lg leading-tight">
            What I can do for you
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
            }}
            className="group relative pt-8 border-t border-white/10 hover:border-[var(--signal)]/50 transition-colors duration-500 cursor-default"
          >
            <div className="absolute top-0 right-0 p-2 transform -translate-y-1/2 bg-[#050508] text-gray-500 group-hover:text-[var(--signal)] transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </div>
            
            <div className="text-5xl font-serif font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 mb-4 select-none">
              {srv.num}
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-[var(--signal)] transition-colors">
              {srv.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {srv.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
