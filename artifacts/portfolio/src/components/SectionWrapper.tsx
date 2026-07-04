import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-24 min-h-screen flex flex-col justify-center ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          },
          hidden: {}
        }}
        className="container mx-auto px-6 max-w-6xl relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
