import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Calendar, Lightbulb } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { hackathons } from '../../data/hackathons';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function Hackathons() {
  const sectionRef = useSectionInView(4);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="hackathons"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full z-10" ref={contentRef}>
        <SectionTitle
          label="Competitions"
          title="Hackathons & Recognitions"
          subtitle="Building under time pressure, validating prototypes rapidly, and competing on national stages."
        />

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-0">
          {/* Animated vertical gradient track */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-coral"
          />

          <div className="space-y-12">
            {hackathons.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Timeline Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                    className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-9 h-9 rounded-full bg-bg-primary border-2 border-accent-cyan flex items-center justify-center z-20 shadow-[0_0_15px_rgba(0,212,255,0.6)]"
                  >
                    <Trophy size={16} className="text-accent-cyan" />
                  </motion.div>

                  {/* Content Card (Left or Right on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
                    transition={{ duration: 0.7, delay: 0.3 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full md:w-[45%] pl-10 md:pl-0 ${
                      isEven ? 'md:pl-8' : 'md:pr-8'
                    }`}
                  >
                    <GlassCard
                      className="p-6"
                      glow={idx === 0 ? '#00D4FF' : idx === 1 ? '#6C63FF' : '#FF6B6B'}
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                          {item.award}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                          <Calendar size={13} />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-display font-bold text-text-primary mb-1">
                        {item.event}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-accent-violet mb-3">
                        <Lightbulb size={13} />
                        <span>Built: {item.project}</span>
                      </div>

                      <p className="text-sm text-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
