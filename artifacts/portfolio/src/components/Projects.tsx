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
    gradient: "from-blue-500/40 via-purple-500/40 to-pink-500/40"
  },
  {
    title: "Flutter Car Showroom",
    desc: "Premium mobile app for a car dealership with 3D-inspired UI and booking system.",
    tags: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/ifatimazai",
    gradient: "from-emerald-500/40 via-teal-500/40 to-cyan-500/40"
  },
  {
    title: "AI Chatbot",
    desc: "Context-aware conversational AI with memory, multi-turn dialogue, and custom personas.",
    tags: ["Python", "OpenAI API", "React", "Node.js"],
    github: "https://github.com/ifatimazai",
    demo: "https://example.com",
    gradient: "from-orange-500/40 via-red-500/40 to-rose-500/40"
  },
  {
    title: "Sentiment Analysis Tool",
    desc: "Real-time sentiment analysis engine for social media data with dashboard visualization.",
    tags: ["Python", "PyTorch", "FastAPI", "React"],
    github: "https://github.com/ifatimazai",
    gradient: "from-indigo-500/40 via-blue-500/40 to-cyan-500/40"
  },
  {
    title: "Task Manager App",
    desc: "Full-featured task manager with kanban board, priorities, deadlines, and team collaboration.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/ifatimazai",
    demo: "https://example.com",
    gradient: "from-violet-500/40 via-fuchsia-500/40 to-pink-500/40"
  },
  {
    title: "Medical AI System",
    desc: "AI-assisted diagnostic tool for medical image analysis using deep learning architectures.",
    tags: ["Python", "TensorFlow", "OpenCV", "Flask"],
    github: "https://github.com/ifatimazai",
    gradient: "from-slate-500/40 via-gray-500/40 to-zinc-500/40"
  }
];

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <motion.div className="mb-12">
        <span className="text-sm font-mono text-blue-500 tracking-widest">[05] PROJECTS</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Selected Work</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } }
            }}
            className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
          >
            {/* Image Placeholder */}
            <div className="aspect-video relative overflow-hidden bg-[#0a0a0f]">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-screen opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out`} />
              
              {/* Geometric pattern overlay */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <span className="px-6 py-2 rounded-full border border-white/20 text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Details
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                {project.desc}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors ml-auto"
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
