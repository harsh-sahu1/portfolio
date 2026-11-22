import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import { GithubIcon } from '../ui/Icons';
import { projects } from '../../data/projects';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function Projects() {
  const sectionRef = useSectionInView(3);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10" ref={contentRef}>
        <SectionTitle
          label="Featured Works"
          title="Engineered Solutions & Applied AI"
          subtitle="From multi-source evidence intelligence to voice-first geriatric healthcare and responsible bias-audited ML."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <GlassCard
                  className="p-7 h-full flex flex-col justify-between"
                  glow={project.color}
                >
                  <div>
                    {/* Top Accent bar, Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          background: `${project.color}15`,
                          borderColor: `${project.color}40`,
                          color: project.color,
                        }}
                      >
                        <FolderGit2 size={20} />
                      </div>

                      {project.badge && (
                        <span
                          className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider border"
                          style={{
                            background: `${project.color}15`,
                            borderColor: `${project.color}35`,
                            color: project.color,
                          }}
                        >
                          {project.badge}
                        </span>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} on GitHub`}
                          className="p-2 rounded-lg bg-bg-primary/80 border border-accent-violet/20 hover:text-text-primary hover:border-accent-cyan/50 transition-colors"
                        >
                          <GithubIcon size={16} />
                        </a>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View live demo of ${project.name}`}
                            className="p-2 rounded-lg bg-bg-primary/80 border border-accent-violet/20 hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span
                            title="Repository link active"
                            className="p-2 rounded-lg bg-bg-primary/40 border border-accent-violet/10 text-text-muted/40 cursor-not-allowed"
                          >
                            <ExternalLink size={16} />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Title & Tagline */}
                    <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
                      {project.name}
                    </h3>
                    <p
                      className="text-xs font-mono font-medium mb-3 line-clamp-2"
                      style={{ color: project.color }}
                    >
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-4 border-t border-accent-violet/10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted/70 block mb-2">
                      Architecture & Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-bg-primary/60 border border-accent-violet/20 text-text-primary/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Link to all repositories on GitHub */}
        <div className="mt-12 text-center">
          <p className="text-xs font-mono text-text-muted">
            All codebases, commits, and experiments are hosted at{' '}
            <a
              href="https://github.com/harsh-sahu1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan font-bold hover:underline"
            >
              github.com/harsh-sahu1
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
