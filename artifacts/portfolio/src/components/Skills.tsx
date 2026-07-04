import { motion } from 'framer-motion';
import { SectionWrapper } from './SectionWrapper';
import { BrainCircuit, Code2, Smartphone, Terminal, Wrench } from 'lucide-react';

const SKILLS = [
  {
    category: "AI & Machine Learning",
    icon: BrainCircuit,
    color: "from-blue-500/20 to-cyan-500/20",
    borderGlow: "group-hover:border-cyan-500/50",
    techs: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP"]
  },
  {
    category: "Full Stack Web",
    icon: Code2,
    color: "from-purple-500/20 to-pink-500/20",
    borderGlow: "group-hover:border-purple-500/50",
    techs: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Firebase", "Supabase"]
  },
  {
    category: "Flutter & Mobile",
    icon: Smartphone,
    color: "from-blue-400/20 to-indigo-500/20",
    borderGlow: "group-hover:border-blue-500/50",
    techs: ["Flutter", "Dart", "Firebase", "REST APIs", "Cross-platform"]
  },
  {
    category: "Languages",
    icon: Terminal,
    color: "from-emerald-500/20 to-teal-500/20",
    borderGlow: "group-hover:border-emerald-500/50",
    techs: ["Python", "TypeScript", "JavaScript", "Dart", "C"]
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    color: "from-orange-500/20 to-red-500/20",
    borderGlow: "group-hover:border-orange-500/50",
    techs: ["Git", "GitHub", "Docker", "Linux", "VS Code", "Figma"]
  }
];

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <motion.div className="mb-12">
        <span className="text-sm font-mono text-blue-500 tracking-widest">[03] SKILLS</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Technical Arsenal</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1 } }
            }}
            className={`group glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${skill.borderGlow}`}
          >
            <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${skill.color}`}>
              <skill.icon className="w-7 h-7 text-white" />
            </div>
            
            <h3 className="text-xl font-serif font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
              {skill.category}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-xs font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full transition-colors group-hover:bg-white/10"
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
