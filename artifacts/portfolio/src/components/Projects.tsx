import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { SectionWrapper } from './SectionWrapper';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/lib/projects';

export function Projects() {
  const [, navigate] = useLocation();

  return (
    <SectionWrapper id="projects">
      {/* Header */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
        className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <span className="section-label">[05] PROJECTS</span>
          <h2 className="text-4xl md:text-5xl font-sans font-black text-white mt-4 leading-tight">
            Selected Work
          </h2>
        </div>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
          A curated selection of AI, full‑stack, and mobile projects built with precision and purpose.
        </p>
      </motion.div>

      {/* Grid — 2 columns like reference image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
        {PROJECTS.map((project, idx) => (
          <motion.article
            key={project.slug}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="group cursor-pointer"
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            {/* Image block */}
            <div
              className="relative overflow-hidden mb-5"
              style={{
                aspectRatio: '16 / 10',
                background: '#0d0c0a',
              }}
            >
              {/* Actual image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Fallback gradient if image hasn't generated yet
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement!;
                  parent.style.background =
                    idx % 2 === 0
                      ? 'linear-gradient(135deg, rgba(201,226,101,0.15) 0%, rgba(8,7,6,1) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(8,7,6,1) 100%)';
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/30 text-white text-sm font-sans font-medium backdrop-blur-sm"
                  style={{ background: 'rgba(8,7,6,0.6)' }}
                >
                  View Project <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div
                  className="absolute top-4 left-4 text-xs font-mono px-3 py-1"
                  style={{
                    background: 'var(--signal)',
                    color: '#080808',
                    letterSpacing: '0.08em',
                  }}
                >
                  FEATURED
                </div>
              )}
            </div>

            {/* Title + subtitle row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className="text-xl font-sans font-black text-white mb-1 transition-colors duration-200 group-hover:text-[var(--signal)]"
                >
                  {project.title}
                </h3>
                <p className="text-sm font-mono" style={{ color: 'var(--text-faint)' }}>
                  {project.subtitle}
                </p>
              </div>
              <ArrowUpRight
                className="w-5 h-5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: 'var(--signal)' }}
              />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Footer line */}
      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.6 } } }}
        className="mt-20 pt-8 border-t flex items-center justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
          {PROJECTS.length} projects total
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
          Click any project to view details →
        </span>
      </motion.div>
    </SectionWrapper>
  );
}
