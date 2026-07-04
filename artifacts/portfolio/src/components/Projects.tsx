import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    title: "AI Education Platform",
    desc: "An intelligent tutoring system that adapts to student learning patterns using Machine Learning.",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    github: "https://github.com/ifatimazai",
    demo: "https://example.com",
    // Wibify-style: dark + lime tint
    gradient: "from-[var(--signal)]/18 via-white/4 to-transparent"
  },
  {
    title: "Flutter Car Showroom",
    desc: "Premium mobile app for a car dealership with 3D-inspired UI and booking system.",
    tags: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/ifatimazai",
    gradient: "from-white/8 via-white/3 to-transparent"
  },
  {
    title: "AI Chatbot",
    desc: "Context-aware conversational AI with memory, multi-turn dialogue, and custom personas.",
    tags: ["Python", "OpenAI API", "React", "Node.js"],
    github: "https://github.com/ifatimazai",
    demo: "https://example.com",
    gradient: "from-white/10 via-[var(--signal)]/8 to-transparent"
  },
  {
    title: "Sentiment Analysis Tool",
    desc: "Real-time sentiment analysis engine for social media data with dashboard visualization.",
    tags: ["Python", "PyTorch", "FastAPI", "React"],
    github: "https://github.com/ifatimazai",
    gradient: "from-[var(--signal)]/14 via-white/5 to-transparent"
  },
  {
    title: "Task Manager App",
    desc: "Full-featured task manager with kanban board, priorities, deadlines, and team collaboration.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/ifatimazai",
    demo: "https://example.com",
    gradient: "from-white/5 via-[var(--signal)]/10 to-transparent"
  },
  {
    title: "Medical AI System",
    desc: "AI-assisted diagnostic tool for medical image analysis using deep learning architectures.",
    tags: ["Python", "TensorFlow", "OpenCV", "Flask"],
    github: "https://github.com/ifatimazai",
    gradient: "from-white/7 via-white/3 to-transparent"
  }
];

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <motion.div className="mb-12">
        <span className="section-label">[05] PROJECTS</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Selected Work</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
            }}
            className="group glass-card overflow-hidden border transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
            style={{ borderColor: 'var(--border-shad)' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,226,101,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-shad)')}
          >
            {/* Image Placeholder */}
            <div className="aspect-video relative overflow-hidden" style={{ background: '#0a0905' }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} group-hover:scale-105 transition-transform duration-700 ease-out`} />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span
                  className="px-5 py-2 border text-white text-sm font-medium transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  View Details
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3
                className="text-xl font-serif font-bold text-white mb-2 transition-colors duration-200"
                style={{ color: '' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--signal)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '')}
              >
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-grow line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-2 py-1 border"
                    style={{
                      color: 'var(--text-faint)',
                      background: 'rgba(255,255,255,0.03)',
                      borderColor: 'var(--border-shad)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t mt-auto" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Github className="w-4 h-4" /> Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors duration-200 ml-auto hover:text-white"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
