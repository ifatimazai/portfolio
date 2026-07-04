import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Switch, Route, useLocation, Router } from 'wouter';

import { PageLoader } from './components/PageLoader';
import { CursorFollower } from './components/CursorFollower';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetail } from './pages/ProjectDetail';

const queryClient = new QueryClient();

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#080706] min-h-screen text-white font-sans selection:bg-[var(--signal)]/20">
      <AnimatePresence mode="wait">
        {loading && <PageLoader />}
      </AnimatePresence>

      <CursorFollower />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Certificates />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function AppRoutes() {
  const [location] = useLocation();

  // Extract slug from /projects/:slug
  const projectMatch = location.match(/^\/projects\/(.+)$/);
  const slug = projectMatch ? projectMatch[1] : null;

  return (
    <Switch>
      <Route path="/projects/:slug">
        <div
          className="min-h-screen font-sans"
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
        >
          <CursorFollower />
          <ScrollProgress />
          {slug && <ProjectDetail slug={slug} />}
        </div>
      </Route>
      <Route>
        <Portfolio />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AppRoutes />
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
