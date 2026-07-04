import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SectionWrapper } from './SectionWrapper';
import { Mail, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { useMagneticButton } from '@/hooks/useMagneticButton';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const btnRef = useMagneticButton();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    setIsSuccess(true);
    reset();
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <SectionWrapper id="contact">
      <motion.div className="mb-12">
        <span className="section-label">[09] CONTACT</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mt-4">Let's Work Together</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Left: Info */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Have a project in mind? Looking for an AI engineer or full-stack developer? 
            Let's connect and build something extraordinary.
          </p>

          <div className="space-y-4">
            <a 
              href="mailto:ifatimazai@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[#C6F135]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#C6F135] group-hover:scale-110 group-hover:bg-[#C6F135]/8 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono mb-1">Email</p>
                <p className="text-white font-medium">ifatimazai@gmail.com</p>
              </div>
            </a>

            <a 
              href="https://linkedin.com/in/fatima-yousaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[#C6F135]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#C6F135] group-hover:scale-110 group-hover:bg-[#C6F135]/8 transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono mb-1">LinkedIn</p>
                <p className="text-white font-medium">linkedin.com/in/fatima-yousaf</p>
              </div>
            </a>

            <a 
              href="https://github.com/ifatimazai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[#C6F135]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#C6F135] group-hover:scale-110 group-hover:bg-[#C6F135]/8 transition-all">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono mb-1">GitHub</p>
                <p className="text-white font-medium">github.com/ifatimazai</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl glass-card group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#C6F135]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-mono mb-1">Location</p>
                <p className="text-white font-medium">Pakistan <span className="text-gray-500 font-normal">(Remote Available)</span></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div 
          className="lg:col-span-7"
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            <AnimatePresence>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-[#0a0a0f]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C6F135] focus:ring-1 focus:ring-[#C6F135] transition-all placeholder:text-gray-600"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C6F135] focus:ring-1 focus:ring-[#C6F135] transition-all placeholder:text-gray-600"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                <input
                  {...register("subject")}
                  type="text"
                  id="subject"
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C6F135] focus:ring-1 focus:ring-[#C6F135] transition-all placeholder:text-gray-600"
                  placeholder="Project Inquiry"
                />
                {errors.subject && <p className="text-red-400 text-xs">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C6F135] focus:ring-1 focus:ring-[#C6F135] transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
              </div>

              <button
                ref={btnRef as any}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-accent text-white font-medium text-lg transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
