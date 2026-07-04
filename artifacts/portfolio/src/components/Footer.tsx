import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#020203] pt-16 pb-8 overflow-hidden">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <button 
              onClick={scrollToTop}
              className="text-3xl font-serif font-black tracking-tighter text-gradient mb-4 block cursor-none"
            >
              FY.
            </button>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              Fatima Yousaf — Building Intelligent Systems that Solve Real Problems. AI Engineer, Full Stack Developer, and Flutter Developer based in Pakistan.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/ifatimazai" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="text-gray-500 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/fatima-yousaf" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="text-gray-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:ifatimazai@gmail.com" aria-label="Send email" className="text-gray-500 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-serif mb-6">Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold font-serif mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/')}
                  download="Fatima_Yousaf_Resume.pdf"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                >
                  Download Resume
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fatima Yousaf. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:-translate-y-1 transition-all" />
          </button>
        </div>
      </div>
    </footer>
  );
}
