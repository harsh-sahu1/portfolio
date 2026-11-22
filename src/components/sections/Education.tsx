import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { education } from '../../data/education';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function Education() {
  const sectionRef = useSectionInView(5);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full z-10" ref={contentRef}>
        <SectionTitle
          label="Education"
          title="Academic Foundation"
          subtitle="Computer science engineering and foundational principles that power my software practice."
        />

        <div className="space-y-8">
          {education.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="p-8 sm:p-10" glow="#6C63FF">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-accent-violet/15">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-violet shadow-[0_0_20px_rgba(108,99,255,0.3)]">
                      <GraduationCap size={30} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-text-primary">
                        {item.institution}
                      </h3>
                      <p className="text-sm font-mono text-accent-cyan font-medium mt-1">
                        {item.degree} in {item.field}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                      <Calendar size={14} className="text-accent-cyan" />
                      <span>{item.duration}</span>
                    </div>
                    {item.gpa && (
                      <span className="px-3 py-1 text-xs font-mono rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-violet font-semibold">
                        GPA: {item.gpa}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights & Coursework */}
                <div className="pt-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted/80 mb-4 flex items-center gap-2">
                    <BookOpen size={14} className="text-accent-cyan" />
                    Key Focus Coursework & Recognitions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-bg-primary/50 border border-accent-violet/10 text-xs font-mono text-text-primary"
                      >
                        <CheckCircle size={14} className="text-accent-cyan shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
