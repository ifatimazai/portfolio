import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home',       id: 'home'       },
  { name: 'About',      id: 'about'      },
  { name: 'Skills',     id: 'skills'     },
  { name: 'Services',   id: 'services'   },
  { name: 'Projects',   id: 'projects'   },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact',    id: 'contact'    },
];

export function Navbar() {
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isVisible,     setIsVisible]     = useState(true);
  const [lastScrollY,   setLastScrollY]   = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const btnRef = useMagneticButton();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsVisible(y <= lastScrollY || y <= 100);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4 bg-[#080706]/80 backdrop-blur-xl border-b border-white/5' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">

          {/* Logo — FY. in lime */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 select-none"
          >
            {/* W-style icon box like Wibify */}
            <div
              className="w-8 h-8 flex items-center justify-center border border-[var(--signal)]/60"
              style={{ background: 'rgba(201,226,101,0.06)' }}
            >
              <span className="font-black text-xs text-[var(--signal)] tracking-tight">FY</span>
            </div>
          </button>

          {/* Desktop nav pill */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] px-3 py-1.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 text-xs font-sans font-medium tracking-wide transition-all duration-250 relative ${
                  activeId === link.id
                    ? 'text-[#080808]'
                    : 'text-[#666] hover:text-white'
                }`}
              >
                {activeId === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[var(--signal)] z-[-1]"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                {link.name}
              </button>
            ))}
          </div>

          {/* Hire Me CTA */}
          <button
            ref={btnRef as any}
            onClick={() => scrollTo('contact')}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white text-xs font-sans font-bold tracking-wide hover:border-[var(--signal)] hover:text-[var(--signal)] transition-all duration-300"
            style={{ letterSpacing: '0.05em' }}
          >
            Hire Me
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] animate-pulse" />
          </button>

          {/* Mobile toggle */}
          <button
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white p-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ─────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[60] bg-[#080706]/98 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <button
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-8 text-[#555] hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`font-sans font-black text-3xl tracking-tight transition-colors ${
                    activeId === link.id ? 'text-[var(--signal)]' : 'text-[#555] hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollTo('contact')}
                className="mt-4 px-8 py-3 bg-[var(--signal)] text-[#080808] font-sans font-bold text-sm tracking-wide hover:bg-[#d4f860] transition-colors"
              >
                Hire Me →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
