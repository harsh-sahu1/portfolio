import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Globe, Server, Cpu, Layers, Sparkles, Orbit, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { skillCategories } from '../../data/skills';
import { useSectionInView } from '../../hooks/useSectionInView';

const iconMap: Record<string, React.ReactNode> = {
  Languages: <Code2 size={20} />,
  'Frontend Engineering': <Globe size={20} />,
  'Backend & APIs': <Server size={20} />,
  'AI / ML & Intelligence': <Cpu size={20} />,
  'Tools & DevOps': <Layers size={20} />,
};

export default function Skills() {
  const sectionRef = useSectionInView(2);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const focusAreas = [
    {
      title: 'Context & Prompt Architecture',
      detail: 'Structuring multi-source context windows, extraction schemas, and citation formats (used in GapGlint & MEDNIVO).',
    },
    {
      title: 'Asynchronous Python Backends',
      detail: 'Building high-throughput FastAPI endpoints, Pydantic validations, and PDF parsing with PyMuPDF.',
    },
    {
      title: 'Voice & Multimodal UX',
      detail: 'Integrating Hindi/English Speech-to-Text and Text-to-Speech models with guarded clinical dialogue loops.',
    },
    {
      title: 'Applied ML & Fairness Testing',
      detail: 'Evaluating classification pipelines for group recall disparity and bias auditing using scikit-learn and pandas.',
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10" ref={contentRef}>
        <SectionTitle
          label="Technical Toolkit"
          title="Skills, Frameworks & Libraries"
          subtitle="The technologies and tools I work with daily to design, test, and ship complete applications."
        />

        {/* 3D Constellation Notice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8 text-xs font-mono text-accent-cyan bg-bg-card/70 border border-accent-cyan/20 rounded-full px-4 py-2 w-fit mx-auto backdrop-blur-md"
        >
          <Orbit size={15} className="animate-spin-slow text-accent-cyan" />
          <span>Interactive 3D Constellation Active in Background</span>
        </motion.div>

        {/* Grid of Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, idx) => {
            const isHovered = activeCategory === category.name;
            const categoryIcon = iconMap[category.name] || <Code2 size={20} />;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveCategory(category.name)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <GlassCard
                  className="p-6 h-full flex flex-col justify-between"
                  glow={category.color}
                >
                  <div>
                    {/* Header with Icon and Title */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2.5 rounded-xl border"
                          style={{
                            color: category.color,
                            borderColor: `${category.color}33`,
                            background: `${category.color}15`,
                          }}
                        >
                          {categoryIcon}
                        </div>
                        <h3
                          className="font-display font-bold text-lg text-text-primary"
                          style={{
                            color: isHovered ? category.color : '#F0F0FF',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {category.name}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-text-muted">
                        {category.skills.length} tools
                      </span>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-mono rounded-md border transition-all duration-300"
                          style={{
                            background: isHovered
                              ? `${category.color}15`
                              : 'rgba(255, 255, 255, 0.02)',
                            borderColor: isHovered
                              ? `${category.color}40`
                              : 'rgba(108, 99, 255, 0.12)',
                            color: isHovered ? '#FFFFFF' : '#D1D1EB',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Accent Bottom Indicator */}
                  <div className="mt-6 pt-3 border-t border-accent-violet/10 flex justify-end">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase"
                      style={{ color: category.color }}
                    >
                      {category.name.toUpperCase()} DOMAIN
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Practical Engineering Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card p-6 sm:p-8 border border-accent-cyan/20"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={18} className="text-accent-cyan animate-pulse" />
            <h4 className="font-display font-bold text-text-primary text-base tracking-wide">
              Everyday Implementation Focus
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="p-4 rounded-xl bg-bg-primary/50 border border-accent-violet/15 flex flex-col gap-1.5"
              >
                <div className="flex items-center gap-2 text-text-primary text-xs font-mono font-semibold">
                  <CheckCircle2 size={14} className="text-accent-cyan shrink-0" />
                  <span>{area.title}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed pl-5">
                  {area.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
