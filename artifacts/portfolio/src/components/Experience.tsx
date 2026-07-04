import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper } from './SectionWrapper';

const EXPERIENCES = [
  {
    title: "BS Computer Science",
    org: "University",
    date: "2023 – Present",
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
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const lineHeight = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="experience">
      <motion.div className="mb-16 text-center">
        <span className="section-label">[06] EXPERIENCE</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">My Journey</h2>
      </motion.div>

      <div className="relative max-w-3xl mx-auto" ref={containerRef}>
        {/* Animated Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 w-full"
            style={{ height: lineHeight, background: 'var(--signal)' }}
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
                {/* Timeline Dot — lime border, lime glow */}
                <div
                  className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#080706] border-2 -translate-x-1/2 z-10"
                  style={{
                    borderColor: 'var(--signal)',
                    boxShadow: '0 0 14px rgba(201,226,101,0.35)'
                  }}
                />

                {/* Desktop Empty Space */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />

                {/* Content Card */}
                <div
                  className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 glass-card p-6 transition-colors duration-300"
                  style={{ borderColor: 'var(--border-shad)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,226,101,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-shad)')}
                >
                  <div
                    className="inline-block px-3 py-1 text-xs font-mono font-medium mb-4 border"
                    style={{
                      background: 'rgba(201,226,101,0.08)',
                      color: 'var(--signal)',
                      borderColor: 'rgba(201,226,101,0.2)'
                    }}
                  >
                    {exp.date}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-1">
                    {exp.title}
                  </h3>

                  <div className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                    {exp.org}
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
