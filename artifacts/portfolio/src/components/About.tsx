import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { useCountUp } from '@/hooks/useCountUp';

export function About() {
  const { count: yearsLearning, ref: yearsRef } = useCountUp(3);
  const { count: projects, ref: projectsRef } = useCountUp(15);
  const { count: technologies, ref: techRef } = useCountUp(20);
  const { count: contributions, ref: commitsRef } = useCountUp(500);

  return (
    <SectionWrapper id="about">
      <motion.div className="mb-4">
        <span className="text-sm font-mono text-blue-500 tracking-widest">[02] ABOUT</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Content */}
        <motion.div 
          className="lg:col-span-7 space-y-8"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
          }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Who I Am</h2>
          
          <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-sans">
            <p>
              I am a Computer Science student passionate about Artificial Intelligence, Machine Learning, 
              Full Stack Development, and Flutter Application Development.
            </p>
            <p>
              I build intelligent software that creates meaningful impact — from predictive ML models 
              to production-ready web apps and seamless cross-platform mobile experiences. My focus is on 
              clean architecture, user-centric design, and scalable AI solutions.
            </p>
            <p className="text-white border-l-2 border-blue-500 pl-4 italic">
              Currently based in Pakistan, open to remote opportunities worldwide.
            </p>
          </div>

          <div className="pt-4">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/')}
              download="Fatima_Yousaf_Resume.pdf"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all group"
            >
              Download Resume
              <motion.span 
                className="ml-2 inline-block"
                group-hover={{ y: 2 }}
              >
                ↓
              </motion.span>
            </a>
          </div>
        </motion.div>

        {/* Right: Abstract Avatar */}
        <motion.div 
          className="lg:col-span-5 relative"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
          }}
        >
          <div className="aspect-square rounded-2xl overflow-hidden relative glass-card p-4 group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 mix-blend-overlay group-hover:opacity-75 transition-opacity duration-500" />
            <div className="w-full h-full rounded-xl bg-[#0a0a0f] border border-white/5 relative flex items-center justify-center overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
              
              <h1 className="text-8xl md:text-9xl font-serif font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none">
                FY
              </h1>
              
              <div className="absolute inset-0 border border-white/5 rounded-xl bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4 } }
        }}
      >
        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2" ref={yearsRef}>
            {yearsLearning}+
          </div>
          <div className="text-sm text-gray-400 font-mono">Years Learning</div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2" ref={projectsRef}>
            {projects}+
          </div>
          <div className="text-sm text-gray-400 font-mono">Projects</div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2" ref={techRef}>
            {technologies}+
          </div>
          <div className="text-sm text-gray-400 font-mono">Technologies</div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-2" ref={commitsRef}>
            {contributions}+
          </div>
          <div className="text-sm text-gray-400 font-mono">GitHub Commits</div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
