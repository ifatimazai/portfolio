import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { getProject } from '@/lib/projects';

interface ProjectDetailProps {
  slug: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUpProps(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease, delay },
  };
}

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const [, navigate] = useLocation();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <p className="text-6xl font-black mb-4" style={{ color: 'var(--signal)' }}>404</p>
          <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>Project not found</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-mono tracking-wide hover:text-white transition-colors mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* ── Fixed Back Bar ────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5"
        style={{
          background: 'rgba(8,7,6,0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-sm font-sans transition-all duration-200 group"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--foreground)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back
        </button>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-wide px-4 py-2 border transition-all duration-200 hover:border-[var(--signal)] hover:text-[var(--signal)]"
              style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}
            >
              Live Demo <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono tracking-wide px-4 py-2 border transition-all duration-200 hover:border-[var(--signal)] hover:text-[var(--signal)]"
            style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'var(--text-muted)' }}
          >
            <Github className="w-3 h-3" /> Code
          </a>
        </div>
      </div>

      {/* ── Page Content ─────────────────────────────── */}
      <div className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-8 md:px-16">

          {/* ── Header ── */}
          <motion.div {...fadeUpProps(0)} className="mb-12">
            <span
              className="inline-block text-xs font-mono tracking-widest uppercase mb-6"
              style={{ color: 'var(--signal)' }}
            >
              / {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tight text-white mb-6 leading-none">
              {project.title}
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              {project.summary}
            </p>
          </motion.div>

          {/* ── Meta row — like image 3 ── */}
          <motion.div
            {...fadeUpProps(0.1)}
            className="flex flex-wrap items-center gap-6 mb-16 pb-8 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-faint)' }}>
                Category
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--foreground)' }}>
                {project.category}
              </span>
            </div>

            <div className="hidden md:block w-px h-4" style={{ background: 'rgba(255,255,255,0.08)' }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-faint)' }}>
                Year
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--foreground)' }}>
                {project.year}
              </span>
            </div>

            {project.liveUrl && (
              <>
                <div className="hidden md:block w-px h-4" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200 hover:text-[var(--signal)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Live Link <ArrowUpRight className="w-3 h-3" />
                </a>
              </>
            )}
          </motion.div>

          {/* ── Hero Image — large, like image 3 ── */}
          <motion.div
            {...fadeUpProps(0.2)}
            className="mb-20 overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover"
              style={{ maxHeight: '560px', objectPosition: 'top' }}
            />
          </motion.div>

          {/* ── About the Project ── */}
          <motion.div {...fadeUpProps(0.3)} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-white mb-8 leading-tight">
              About the Project
            </h2>
            {project.about.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
                {para}
              </p>
            ))}
          </motion.div>

          {/* ── Challenge + Solution — 2-col ── */}
          <motion.div {...fadeUpProps(0.35)} className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-sans font-black text-white mb-5 leading-tight">
                The Challenge
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-sans font-black text-white mb-5 leading-tight">
                The Solution
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {project.solution}
              </p>
            </div>
          </motion.div>

          {/* ── Key Highlights ── */}
          <motion.div {...fadeUpProps(0.4)} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-sans font-black text-white mb-10 leading-tight">
              Key Highlights
            </h2>
            <div className="space-y-0">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4 py-5 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <span
                    className="text-xs font-mono mt-0.5 shrink-0 w-6 tabular-nums"
                    style={{ color: 'var(--signal)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {h}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Tech Stack ── */}
          <motion.div {...fadeUpProps(0.45)} className="mb-24">
            <h2 className="text-2xl font-sans font-black text-white mb-8">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-4 py-2 border"
                  style={{
                    color: 'var(--foreground)',
                    background: 'rgba(201,226,101,0.04)',
                    borderColor: 'rgba(201,226,101,0.15)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            {...fadeUpProps(0.5)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-12 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 text-sm font-sans font-bold border transition-all duration-300 hover:border-[var(--signal)] hover:text-[var(--signal)]"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--foreground)' }}
            >
              <Github className="w-4 h-4" /> View Source Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 text-sm font-sans font-bold transition-all duration-300"
                style={{ background: 'var(--signal)', color: '#080808' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#d4f860')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--signal)')}
              >
                View Live Demo <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
