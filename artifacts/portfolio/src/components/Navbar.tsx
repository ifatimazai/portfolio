import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Services', id: 'services' },
  { name: 'Projects', id: 'projects' },
  { name: 'Experience', id: 'experience' },
  { name: 'Contact', id: 'contact' },
];

export function Navbar() {
  const activeId = useScrollSpy(NAV_LINKS.map(link => link.id));
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const btnRef = useMagneticButton();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 px-6 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-2xl font-serif font-black tracking-tighter cursor-pointer text-gradient select-none"
          >
            FY.
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeId === link.id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {activeId === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10 z-[-1]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            ref={btnRef as any}
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex relative px-6 py-2.5 rounded-full font-medium text-sm overflow-hidden group transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full rounded-full border border-white/20 group-hover:border-transparent transition-colors duration-300" />
            <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
            <span className="relative z-10 flex items-center gap-2 text-white">
              Hire Me
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </span>
          </button>

          {/* Mobile Toggle */}
          <button
            aria-label="Open navigation menu"
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#050508]/95 backdrop-blur-3xl flex flex-col justify-center items-center"
          >
            <button
              aria-label="Close navigation menu"
              className="absolute top-6 right-6 text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center gap-6 text-2xl font-serif">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors ${
                    activeId === link.id ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-6 px-8 py-3 rounded-full bg-gradient-accent text-white font-sans text-base font-medium flex items-center gap-2"
              >
                Hire Me
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
