import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(timer); return 100; }
        return prev + 5;
      });
    }, 38);
    return () => clearInterval(timer);
  }, []);

  const name = 'Fatima'.split('');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#080808]"
    >
      {/* Name reveal */}
      <div className="flex overflow-hidden mb-8">
        {name.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: i * 0.08 }}
            className="inline-block font-sans font-black text-white"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', letterSpacing: '-0.04em' }}
          >
            {char}
          </motion.span>
        ))}
        {/* Dot in lime */}
        <motion.span
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: name.length * 0.08 }}
          className="inline-block font-sans font-black"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', color: '#C6F135', letterSpacing: '-0.04em' }}
        >
          .
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="w-40 h-[1.5px] bg-white/8 relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: `${progress}%`, background: '#C6F135' }}
        />
      </div>

      {/* Counter */}
      <p className="mt-4 font-mono text-xs text-[#444] tracking-widest">{progress}%</p>
    </motion.div>
  );
}
