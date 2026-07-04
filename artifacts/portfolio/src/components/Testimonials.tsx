import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionWrapper } from './SectionWrapper';

const TESTIMONIALS = [
  {
    quote: "Fatima delivered exceptional work on our AI integration. Her deep understanding of ML and clean code made the project a massive success.",
    author: "Ahmad Raza",
    role: "CTO at TechStartup"
  },
  {
    quote: "One of the most talented developers I've worked with. The Flutter app she built exceeded all our expectations in UI, smoothness, and overall performance.",
    author: "Sara Khan",
    role: "Founder at AppCo"
  },
  {
    quote: "Exceptional problem-solving ability and attention to detail. The sentiment analysis tool she built is now a core component of our main product.",
    author: "James Liu",
    role: "PM at DataCorp"
  }
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Auto-play
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);
    
    return () => {
      clearInterval(autoplay);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <SectionWrapper id="testimonials">
      <motion.div className="mb-16 text-center">
        <span className="section-label">[08] TESTIMONIALS</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Client Feedback</h2>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 px-4">
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl text-[#C6F135]/20 font-serif leading-none mb-6">"</div>
                  
                  <p className="text-xl md:text-3xl text-white font-serif font-medium leading-relaxed mb-10">
                    {testimonial.quote}
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-serif font-bold text-lg mb-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <h4 className="text-lg text-white font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 font-mono">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                selectedIndex === idx 
                  ? 'w-8 h-2 bg-[#C6F135]' 
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
