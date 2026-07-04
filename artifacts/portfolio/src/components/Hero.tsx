import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';

// ─── Orbital Canvas ────────────────────────────────────────────────────────
// Wibify-inspired: large floating asteroid sphere + orbital ring + mirror portal
function OrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let t = 0;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    // Build asteroid texture using layered noise
    const drawAsteroid = (cx: number, cy: number, radius: number, phase: number) => {
      // Atmospheric glow behind sphere
      const glow = ctx.createRadialGradient(cx, cy - radius * 0.2, radius * 0.1, cx, cy, radius * 1.9);
      glow.addColorStop(0, 'rgba(198,241,53,0.04)');
      glow.addColorStop(0.4, 'rgba(100,100,120,0.06)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.9, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Sphere body — dark stone with subtle highlight
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.35, radius * 0.05,
        cx + radius * 0.1, cy + radius * 0.1, radius * 1.05
      );
      sphereGrad.addColorStop(0,   'rgba(90,88,85,0.95)');
      sphereGrad.addColorStop(0.3, 'rgba(52,50,48,0.97)');
      sphereGrad.addColorStop(0.7, 'rgba(25,24,22,0.99)');
      sphereGrad.addColorStop(1,   'rgba(10,10,9,1)');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Surface texture — small crater marks
      const seed = (n: number) => Math.sin(n * 127.1 + phase * 0.003) * 0.5 + 0.5;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      for (let i = 0; i < 38; i++) {
        const angle = seed(i * 7) * Math.PI * 2;
        const dist  = seed(i * 13) * radius * 0.82;
        const px    = cx + Math.cos(angle) * dist;
        const py    = cy + Math.sin(angle) * dist * 0.7;
        const cr    = seed(i * 17) * radius * 0.12 + radius * 0.02;
        const alpha = 0.06 + seed(i * 31) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, cr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fill();
        // crater rim highlight
        ctx.beginPath();
        ctx.arc(px - cr * 0.3, py - cr * 0.3, cr * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,115,105,${alpha * 0.4})`;
        ctx.fill();
      }
      ctx.restore();

      // Specular highlight
      const spec = ctx.createRadialGradient(
        cx - radius * 0.3, cy - radius * 0.35, 0,
        cx - radius * 0.3, cy - radius * 0.35, radius * 0.5
      );
      spec.addColorStop(0, 'rgba(220,215,200,0.18)');
      spec.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();
    };

    // Orbital ring — perspective ellipse rotating
    const drawOrbit = (cx: number, cy: number, rx: number, ry: number, angle: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Back half of ring (behind sphere) — dimmer
      const gradient = ctx.createLinearGradient(-rx, 0, rx, 0);
      gradient.addColorStop(0,   'rgba(198,241,53,0)');
      gradient.addColorStop(0.25,'rgba(198,241,53,0.55)');
      gradient.addColorStop(0.5, 'rgba(198,241,53,0.9)');
      gradient.addColorStop(0.75,'rgba(198,241,53,0.55)');
      gradient.addColorStop(1,   'rgba(198,241,53,0)');

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, Math.PI, 0); // top arc (back)
      ctx.strokeStyle = 'rgba(198,241,53,0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI); // bottom arc (front)
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Glow on ring
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI);
      ctx.shadowColor = '#C6F135';
      ctx.shadowBlur  = 12;
      ctx.strokeStyle = 'rgba(198,241,53,0.3)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Mirror portal — tall reflective slab
    const drawPortal = (x: number, y: number, w: number, h: number) => {
      const grad = ctx.createLinearGradient(x, y, x + w, y);
      grad.addColorStop(0,   'rgba(255,255,255,0.005)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.04)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.025)');
      grad.addColorStop(1,   'rgba(255,255,255,0.005)');

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Portal border
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(x, y, w, h);

      // Subtle inner reflection line
      ctx.beginPath();
      ctx.moveTo(x + w * 0.6, y + h * 0.05);
      ctx.lineTo(x + w * 0.7, y + h * 0.95);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 6;
      ctx.stroke();
    };

    // Ambient dust particles
    type Dust = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let dust: Dust[] = [];
    const initDust = () => {
      dust = Array.from({ length: 60 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.25 + 0.05,
      }));
    };

    const drawDust = () => {
      for (const d of dust) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Subtle background radial vignette
      const bgGrad = ctx.createRadialGradient(W * 0.72, H * 0.5, 0, W * 0.72, H * 0.5, W * 0.65);
      bgGrad.addColorStop(0,   'rgba(30,35,25,0.25)');
      bgGrad.addColorStop(0.5, 'rgba(15,20,10,0.15)');
      bgGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      const floatY = Math.sin(t * 0.0008) * 18;
      const orbitAngle = t * 0.0012;

      // Right-side composition — sphere + portal
      const sphereX = W * 0.72;
      const sphereY = H * 0.5 + floatY;
      const sphereR = Math.min(W, H) * 0.26;

      // Portal slab (behind sphere)
      const portalW = sphereR * 0.55;
      const portalH = H * 0.78;
      const portalX = sphereX - portalW * 0.2;
      const portalY = (H - portalH) / 2;
      drawPortal(portalX, portalY + floatY * 0.3, portalW, portalH);

      // Orbit ring behind sphere (back arc already dimmed in drawOrbit)
      drawOrbit(sphereX, sphereY, sphereR * 1.55, sphereR * 0.38, orbitAngle);

      // Asteroid sphere
      drawAsteroid(sphereX, sphereY, sphereR, t);

      // Dust
      drawDust();

      t++;
      raf = requestAnimationFrame(draw);
    };

    resize();
    initDust();
    draw();
    window.addEventListener('resize', () => { resize(); initDust(); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

// ─── Typewriter ──────────────────────────────────────────────────────────────
function Typewriter() {
  const roles = ['AI Engineer', 'ML Engineer', 'Full Stack Developer', 'Flutter Developer'];
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let speed = isDeleting ? 45 : 95;

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((p) => (p + 1) % roles.length);
      return;
    }

    const t = setTimeout(() => {
      setText((p) => isDeleting ? current.slice(0, p.length - 1) : current.slice(0, p.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="flex items-center gap-1 font-mono text-sm tracking-widest uppercase text-[#666]">
      <span className="text-[#C6F135]">/</span>
      <span style={{ color: '#999' }}>{text}</span>
      <span className="inline-block w-[2px] h-4 bg-[#C6F135] animate-pulse ml-0.5" />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const viewRef  = useMagneticButton();
  const dlRef    = useMagneticButton();
  const { scrollY } = useScroll();
  const opacity  = useTransform(scrollY, [0, 600], [1, 0]);
  const y        = useTransform(scrollY, [0, 600], [0, 80]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Orbital 3-D canvas background ── */}
      <OrbitalCanvas />

      {/* ── Bottom-left ground fog ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
        }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-32 pb-20"
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-10 h-[1px] bg-[#C6F135]" />
          <span className="section-label">[01] AI &amp; Software Engineer</span>
        </motion.div>

        {/* Main heading — Wibify mixed typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-sans font-black text-white leading-[1.0] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}>
            Building{' '}
            <span
              className="editorial editorial-underline"
              style={{ color: '#C6F135', fontSize: '1.05em' }}
            >
              intelligent
            </span>
            <br />
            systems through
            <br />
            <span
              className="editorial editorial-underline"
              style={{ color: '#C6F135', fontSize: '1.05em' }}
            >
              AI,
            </span>
            {' '}software{' '}
            <span className="text-[#444]">&amp;</span>
            <br />
            <span
              className="editorial editorial-underline"
              style={{ color: '#C6F135', fontSize: '1.05em' }}
            >
              design.
            </span>
          </h1>
        </motion.div>

        {/* Name + typewriter row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8"
        >
          <p className="text-[#555] text-base font-sans">
            Hi, I'm{' '}
            <span className="text-white font-bold">Fatima Yousaf</span>
            {' '}— Pakistan
          </p>
          <div className="w-px h-4 bg-[#333] hidden sm:block" />
          <Typewriter />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-5 text-[#555] text-base max-w-md leading-relaxed font-sans"
        >
          Designing AI products. Engineering modern software.<br />
          Building the future from Pakistan.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            ref={viewRef as any}
            onClick={() => scrollTo('projects')}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 font-sans font-bold text-sm text-[#080808] bg-[#C6F135] overflow-hidden transition-all duration-300 hover:bg-[#d4f860]"
            style={{ letterSpacing: '0.02em' }}
          >
            View Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          <a
            ref={dlRef as any}
            href={`${import.meta.env.BASE_URL}resume.pdf`.replace('//', '/')}
            download="Fatima_Yousaf_Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-sans font-bold text-sm text-white border border-[#333] hover:border-[#C6F135] hover:text-[#C6F135] transition-all duration-300"
            style={{ letterSpacing: '0.02em' }}
          >
            Download Resume
          </a>

          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-7 py-3.5 font-sans text-sm text-[#555] hover:text-white transition-colors duration-300"
            style={{ letterSpacing: '0.02em' }}
          >
            Contact Me →
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 flex items-center gap-5"
        >
          {[
            { icon: Github,   href: 'https://github.com/yourusername',           label: 'GitHub'   },
            { icon: Linkedin, href: 'https://linkedin.com/in/yourprofile',        label: 'LinkedIn' },
            { icon: Mail,     href: 'mailto:ifatimazai@gmail.com',               label: 'Email'    },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex items-center gap-2 text-[#444] hover:text-[#C6F135] transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
              <span className="font-mono text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {label}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-8 md:left-16 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#444]" />
          </motion.div>
          <span className="font-mono text-xs text-[#333] tracking-widest">SCROLL</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
