import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';

const EXPERIENCES = [
  {
    title: "BS Computer Science",
    org: "University",
    date: "2022 – Present",
    desc: "Pursuing CS degree with focus on Artificial Intelligence, Machine Learning, and software engineering principles. Maintaining a high GPA while actively participating in tech societies."
  },
  {
    title: "AI/ML Enthusiast",
    org: "Self-Learning",
    date: "2021 – Present",
    desc: "Deep learning with TensorFlow and PyTorch. Built 15+ complex projects across AI, web, and mobile domains. Constantly exploring new architectures and research papers."
  },
  {
    title: "Freelance Developer",
    org: "Remote",
    date: "2023 – Present",
    desc: "Delivering end-to-end full-stack web applications, Flutter mobile apps, and custom AI solutions for international clients. Handling requirements, design, and deployment."
  },
  {
    title: "Hackathon Competitor",
    org: "Various Events",
    date: "2022 – Present",
    desc: "Actively participating in national-level hackathons. Collaborating with teams to build innovative, AI-powered solutions under extreme time pressure."
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  });

  const lineHeight = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="experience">
      <motion.div className="mb-16 text-center">
        <span className="section-label">[06] EXPERIENCE</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">My Journey</h2>
      </motion.div>

      <div className="relative max-w-3xl mx-auto" ref={containerRef}>
        {/* Animated Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-gradient-accent w-full"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-12 pb-12">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.2 } }
                }}
                className={`relative flex items-center justify-between md:justify-normal gap-8 md:gap-0 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#050508] border-2 border-[#C6F135] -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                {/* Desktop Empty Space */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />

                {/* Content Card */}
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 glass-card p-6 rounded-2xl hover:border-[#C6F135]/30 transition-colors duration-300">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-medium mb-4 border border-[#C6F135]/20">
                    {exp.date}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {exp.title}
                  </h3>
                  
                  <div className="text-sm font-medium text-gray-400 mb-4">
                    {exp.org}
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
