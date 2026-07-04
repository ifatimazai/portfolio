import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About',      id: 'about'      },
  { name: 'Skills',     id: 'skills'     },
  { name: 'Projects',   id: 'projects'   },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact',    id: 'contact'    },
];

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border-shad)',
      }}
    >
      {/* Top lime accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(to right, transparent, var(--signal), transparent)', opacity: 0.4 }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={scrollToTop}
              className="font-sans font-black text-3xl tracking-tight mb-4 block"
              style={{ color: 'var(--signal)' }}
            >
              FY.
            </button>
            <p className="text-sm max-w-sm mb-6 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Fatima Yousaf — Building Intelligent Systems that Solve Real Problems. AI Engineer, Full Stack Developer, and Flutter Developer based in Pakistan.
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: 'https://github.com/ifatimazai',          label: 'GitHub profile',  Icon: Github   },
                { href: 'https://linkedin.com/in/fatima-yousaf',  label: 'LinkedIn profile', Icon: Linkedin },
                { href: 'mailto:ifatimazai@gmail.com',            label: 'Send email',       Icon: Mail     },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Send email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors duration-200"
                  style={{ color: 'var(--text-faint)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--signal)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-faint)')}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-sans mb-6 text-sm tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}>Navigation</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--signal)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold font-sans mb-6 text-sm tracking-wide uppercase" style={{ letterSpacing: '0.08em' }}>Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/')}
                  download="Fatima_Yousaf_Resume.pdf"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--signal)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >
                  Download Resume
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--signal)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
            © {new Date().getFullYear()} Fatima Yousaf. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center justify-center w-9 h-9 border transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--border-shad)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,226,101,0.4)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(201,226,101,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-shad)';
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            <ArrowUp
              className="w-4 h-4 transition-all duration-200 group-hover:-translate-y-0.5"
              style={{ color: 'var(--text-muted)' }}
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
