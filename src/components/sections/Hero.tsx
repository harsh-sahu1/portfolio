import { motion } from 'framer-motion';
import { Mail, ChevronDown, ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function Hero() {
  const sectionRef = useSectionInView(0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-between section-padding overflow-hidden pt-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card mb-6 border border-accent-violet/30"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-text-primary tracking-wide">
              CS Undergrad @ JECRC · SIH Top 20 · ONGC Scholar
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-[-0.035em] leading-[1.05] mb-4 text-text-primary">
              Harsh <br />
              <span className="gradient-text">Sahu</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="text-accent-cyan font-mono text-base sm:text-lg font-medium tracking-wide">
              Software Engineer & Builder
            </span>
          </motion.div>

          {/* Bio text - Human, sharp, non-AI */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-text-muted text-base sm:text-lg max-w-xl leading-relaxed mb-8"
          >
            I build software that turns emerging AI models into reliable, verifiable products — from evidence intelligence platforms to voice-guided healthcare assistants and queue management tools.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              variant="primary"
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 text-sm flex items-center gap-2"
            >
              See What I've Built
              <ArrowRight size={16} />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 text-sm"
            >
              Get in Touch
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-4 text-text-muted"
          >
            <a
              href="https://github.com/harsh-sahu1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-lg border border-accent-violet/20 bg-bg-card/60 hover:text-accent-cyan hover:border-accent-cyan/40 transition-all duration-300"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-lg border border-accent-violet/20 bg-bg-card/60 hover:text-accent-violet hover:border-accent-violet/40 transition-all duration-300"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="mailto:sahuharsh090@gmail.com"
              aria-label="Send Email"
              className="p-2.5 rounded-lg border border-accent-violet/20 bg-bg-card/60 hover:text-accent-coral hover:border-accent-coral/40 transition-all duration-300"
            >
              <Mail size={18} />
            </a>
            <span className="text-xs font-mono text-text-muted/60 pl-2">
              Jaipur, India · Open for internships & collaborations
            </span>
          </motion.div>
        </div>

        {/* Right Column - Dedicated space for 3D Neural Orb */}
        <div className="lg:col-span-5 pointer-events-none hidden lg:block" aria-hidden="true" />
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
          Explore Portfolio
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-accent-cyan"
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
