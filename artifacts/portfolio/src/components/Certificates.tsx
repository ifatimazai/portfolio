import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionWrapper } from './SectionWrapper';
import { BadgeCheck } from 'lucide-react';

const CERTIFICATES = [
  {
    issuer: "Coursera / DeepLearning.AI",
    name: "Machine Learning Specialization",
    date: "2023"
  },
  {
    issuer: "Google",
    name: "TensorFlow Developer Certificate",
    date: "2023"
  },
  {
    issuer: "Udemy",
    name: "Flutter & Dart Development",
    date: "2022"
  },
  {
    issuer: "IBM / Coursera",
    name: "Python for Data Science",
    date: "2022"
  },
  {
    issuer: "Meta",
    name: "Front-End Developer Professional",
    date: "2023"
  },
  {
    issuer: "Microsoft",
    name: "Microsoft Azure AI Fundamentals",
    date: "2024"
  }
];

export function Certificates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  return (
    <SectionWrapper id="certificates" className="overflow-hidden">
      <motion.div className="mb-12">
        <span className="section-label">[07] CERTIFICATES</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Continuous Learning</h2>
      </motion.div>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 pb-8 pt-4 cursor-grab active:cursor-grabbing">
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="glass-card h-full rounded-2xl p-6 relative overflow-hidden group hover:border-[#C6F135]/30 transition-colors duration-300">
                  {/* Top Gradient Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                      {cert.date}
                    </div>
                    <BadgeCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {cert.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#050508] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#050508] to-transparent pointer-events-none" />
      </div>
    </SectionWrapper>
  );
}
