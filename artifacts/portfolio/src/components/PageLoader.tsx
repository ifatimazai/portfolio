import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const name = "Fatima".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050508]"
    >
      <div className="flex overflow-hidden text-5xl md:text-7xl font-serif font-bold text-white mb-8">
        {name.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.33, 1, 0.68, 1],
              delay: index * 0.1,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-blue-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="mt-4 font-mono text-sm text-gray-500">
        {progress}%
      </div>
    </motion.div>
  );
}
