import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function About() {
  const sectionRef = useSectionInView(1);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });
  const [imgError, setImgError] = useState(false);

  const pillars = [
    {
      title: 'Traceable & Reliable AI',
      desc: 'Focusing on systems with verifiable citations and audit trails rather than blind model outputs.',
      icon: <ShieldCheck size={18} className="text-accent-cyan" />,
    },
    {
      title: 'Fast Prototyping to Functional Apps',
      desc: 'Turning ideas into working full-stack prototypes quickly using modern toolchains and clean code.',
      icon: <Zap size={18} className="text-accent-violet" />,
    },
    {
      title: 'Accessibility & User Safety',
      desc: 'Designing guarded voice interfaces for seniors and bias-auditing tools that protect real users.',
      icon: <Layers size={18} className="text-emerald-400" />,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10" ref={contentRef}>
        <SectionTitle
          label="About Me"
          title="Building Practical, Verifiable Software"
          subtitle="A computer science student who likes building things that solve actual problems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Avatar & Proven Highlights */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Visual Profile Surface with Photo Support */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-1 bg-gradient-to-tr from-accent-violet via-accent-cyan to-emerald-400 shadow-[0_0_50px_rgba(108,99,255,0.25)] group">
              <div className="w-full h-full bg-bg-card rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden border border-accent-violet/20">
                {!imgError ? (
                  <>
                    <img
                      src="/profile.jpg"
                      alt="Harsh Sahu"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay for contrast and modern aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/30 to-transparent opacity-90 pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 text-left pointer-events-none z-10">
                      <h3 className="font-display font-bold text-base text-text-primary">
                        Harsh Sahu
                      </h3>
                      <p className="font-mono text-xs text-accent-cyan mt-0.5">
                        CS Undergrad @ JECRC Foundation
                      </p>
                      <span className="text-[10px] font-mono text-text-muted">
                        Jaipur, Rajasthan
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {/* Subtle radial backdrop */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #6C63FF 1px, transparent 0)',
                        backgroundSize: '18px 18px',
                      }}
                    />

                    <span
                      className="text-6xl sm:text-7xl font-display font-black gradient-text select-none tracking-tight"
                      style={{ filter: 'drop-shadow(0 0 25px rgba(108, 99, 255, 0.45))' }}
                    >
                      HS
                    </span>
                    <h3 className="font-display font-bold text-base text-text-primary mt-3">
                      Harsh Sahu
                    </h3>
                    <p className="font-mono text-xs text-accent-cyan mt-0.5">
                      CS Undergrad @ JECRC Foundation
                    </p>
                    <span className="text-[11px] font-mono text-text-muted mt-2 border-t border-accent-violet/15 pt-2 w-full">
                      Jaipur, Rajasthan
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Verified Highlights */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              <GlassCard className="p-3.5 text-center" glow="#6C63FF">
                <span className="block text-xl font-display font-bold text-accent-cyan">Top 20</span>
                <span className="text-[11px] font-mono text-text-muted">SIH Finalist</span>
              </GlassCard>
              <GlassCard className="p-3.5 text-center" glow="#00D4FF">
                <span className="block text-xl font-display font-bold text-accent-violet">ONGC</span>
                <span className="text-[11px] font-mono text-text-muted">Scholar '25</span>
              </GlassCard>
              <GlassCard className="p-3.5 text-center" glow="#10B981">
                <span className="block text-xl font-display font-bold text-emerald-400">8+</span>
                <span className="text-[11px] font-mono text-text-muted">Hackathons</span>
              </GlassCard>
            </div>
          </motion.div>

          {/* Right Column: Genuine Narrative */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4 text-text-muted text-base leading-relaxed">
              <p>
                I'm a Computer Science student at <strong className="text-text-primary font-medium">JECRC Foundation in Jaipur</strong> with a strong habit of building things. I like taking emerging AI capabilities and embedding them into practical, grounded software that people can actually test and use.
              </p>
              <p>
                A lot of modern AI projects stop at wrapper demos. My focus is on what happens next: making sure claims in <strong className="text-accent-violet">GapGlint</strong> have sentence-level source citations, ensuring <strong className="text-accent-cyan">MEDNIVO</strong> has clinical confirmation guardrails so elderly patients never get wrong dosage records, and helping farmers at mandis book procurement slots smoothly in <strong className="text-emerald-400">Kisan Setu</strong>.
              </p>
              <p>
                I love hackathons because they cut through theoretical hesitation and force you to ship a complete, working prototype under real constraints. When I'm not hacking on projects, I spend my time practicing core data structures, understanding systems, and exploring applied ML.
              </p>
            </div>

            {/* Engineering Pillars */}
            <div className="pt-2 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-text-primary mb-2 flex items-center gap-2">
                <Sparkles size={14} className="text-accent-cyan" />
                What I Care About When Building
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pillars.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-bg-card/70 border border-accent-violet/20 flex flex-col gap-2 hover:border-accent-cyan/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-display font-semibold text-xs text-text-primary">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
