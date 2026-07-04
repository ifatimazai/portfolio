import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionWrapper } from './SectionWrapper';
import { BadgeCheck } from 'lucide-react';

const CERTIFICATES = [
  { issuer: "Coursera / DeepLearning.AI", name: "Machine Learning Specialization", date: "2023" },
  { issuer: "Google",                     name: "TensorFlow Developer Certificate", date: "2023" },
  { issuer: "Udemy",                      name: "Flutter & Dart Development",       date: "2022" },
  { issuer: "IBM / Coursera",             name: "Python for Data Science",          date: "2022" },
  { issuer: "Meta",                       name: "Front-End Developer Professional", date: "2023" },
  { issuer: "Microsoft",                  name: "Microsoft Azure AI Fundamentals",  date: "2024" }
];

export function Certificates() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  return (
    <SectionWrapper id="certificates" className="overflow-hidden">
      <motion.div className="mb-12">
        <span className="section-label">[07] CERTIFICATES</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Continuous Learning</h2>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pb-8 pt-4 cursor-grab active:cursor-grabbing">
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
              >
                <div
                  className="glass-card h-full p-6 relative overflow-hidden group transition-colors duration-300"
                  style={{ borderColor: 'var(--border-shad)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,226,101,0.25)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-shad)')}
                >
                  {/* Top lime accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'var(--signal)' }}
                  />

                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="px-3 py-1 border text-xs font-mono"
                      style={{
                        color: 'var(--text-faint)',
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: 'var(--border-shad)'
                      }}
                    >
                      {cert.date}
                    </div>
                    {/* Lime badge icon */}
                    <BadgeCheck className="w-5 h-5" style={{ color: 'var(--signal)' }} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {cert.name}
                  </h3>

                  <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 pointer-events-none"
             style={{ background: 'linear-gradient(to right, var(--background), transparent)' }} />
        <div className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none"
             style={{ background: 'linear-gradient(to left, var(--background), transparent)' }} />
      </div>
    </SectionWrapper>
  );
}
