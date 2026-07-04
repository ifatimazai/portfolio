import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { BrainCircuit, Code2, Smartphone, Terminal, Wrench } from 'lucide-react';

// All card gradients use signal lime only — consistent with Wibify mono-accent system
const SKILLS = [
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    techs: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP"]
  },
  {
    category: "Full Stack Web",
    icon: Code2,
    techs: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Firebase", "Supabase"]
  },
  {
    category: "Flutter & Mobile",
    icon: Smartphone,
    techs: ["Flutter", "Dart", "Firebase", "REST APIs", "Cross-platform"]
  },
  {
    category: "Languages",
    icon: Terminal,
    techs: ["Python", "TypeScript", "JavaScript", "Dart", "C"]
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    techs: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Figma"]
  }
];

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <motion.div className="mb-12">
        <span className="section-label">[03] SKILLS</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Technical Arsenal</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
            }}
            className="group glass-card p-6 transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: 'var(--border-shad)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,226,101,0.28)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(201,226,101,0.07)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-shad)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Icon box */}
            <div
              className="w-12 h-12 mb-6 flex items-center justify-center border"
              style={{ background: 'rgba(201,226,101,0.07)', borderColor: 'rgba(201,226,101,0.18)' }}
            >
              <skill.icon className="w-6 h-6" style={{ color: 'var(--signal)' }} />
            </div>

            <h3 className="text-lg font-sans font-bold text-white mb-5 transition-colors duration-200 group-hover:text-[var(--signal)]"
                style={{ letterSpacing: '-0.01em' }}>
              {skill.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-mono border transition-colors duration-200"
                  style={{
                    color: 'var(--text-faint)',
                    background: 'rgba(255,255,255,0.025)',
                    borderColor: 'var(--border-shad)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
