import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Send, MessageSquare, Check, ArrowUpRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useSectionInView } from '../../hooks/useSectionInView';

export default function Contact() {
  const sectionRef = useSectionInView(6);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: '-10% 0px' });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name || 'Visitor'}`);
    const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.name}\nEmail: ${formState.email}`);
    window.location.href = `mailto:sahuharsh090@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const contactChannels = [
    {
      title: 'Email',
      value: 'sahuharsh090@gmail.com',
      link: 'mailto:sahuharsh090@gmail.com',
      icon: <Mail size={22} />,
      color: '#FF6B6B',
    },
    {
      title: 'GitHub',
      value: 'github.com/harsh-sahu1',
      link: 'https://github.com/harsh-sahu1',
      icon: <GithubIcon size={22} />,
      color: '#6C63FF',
    },
    {
      title: 'LinkedIn',
      value: 'linkedin.com/in/harsh-sahu1',
      link: 'https://linkedin.com',
      icon: <LinkedinIcon size={22} />,
      color: '#00D4FF',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Background glow radial */}
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #6C63FF 0%, #00D4FF 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full z-10 pt-10" ref={contentRef}>
        <SectionTitle
          label="Connect"
          title="Let's Build Something Exceptional"
          subtitle="Whether you are discussing AI/ML research directions, engineering architecture, or exploring job opportunities, I'd love to connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-display font-bold text-text-primary mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-accent-cyan" />
              Direct Communication
            </h3>

            {contactChannels.map((item, idx) => (
              <motion.a
                key={item.title}
                href={item.link}
                target={item.title !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                <GlassCard className="p-5" glow={item.color}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border"
                        style={{
                          background: `${item.color}15`,
                          borderColor: `${item.color}40`,
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted">
                          {item.title}
                        </h4>
                        <p className="text-sm font-mono text-text-primary font-medium mt-0.5">
                          {item.value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-text-muted" />
                  </div>
                </GlassCard>
              </motion.a>
            ))}

            <div className="pt-4">
              <div className="p-4 rounded-xl glass-card border border-accent-cyan/20">
                <span className="text-xs font-mono text-accent-cyan block font-semibold mb-1">
                  LOCATION & TIME ZONE
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Jaipur, India (IST, UTC+5:30) · Open to global remote teams & relocation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 sm:p-10" glow="#6C63FF">
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs font-mono text-text-muted mb-6">
                Fill in your thoughts and it will dispatch directly.
              </p>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <Check size={28} />
                  </div>
                  <h4 className="text-xl font-display font-bold text-text-primary">
                    Message Dispatched!
                  </h4>
                  <p className="text-sm text-text-muted max-w-sm">
                    Thank you for reaching out. Harsh will review and respond as soon as possible.
                  </p>
                  <MagneticButton
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', message: '' });
                    }}
                    className="mt-2 text-xs"
                  >
                    Send Another Note
                  </MagneticButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-bg-primary/80 border border-accent-violet/20 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent-cyan/60 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="ada@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-bg-primary/80 border border-accent-violet/20 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent-cyan/60 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-text-muted mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Harsh, I saw your work on GapGlint and MEDNIVO..."
                      className="w-full px-4 py-3 rounded-xl bg-bg-primary/80 border border-accent-violet/20 text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:border-accent-cyan/60 transition-colors font-mono resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <MagneticButton
                      variant="primary"
                      type="submit"
                      className="px-8 py-3 text-sm flex items-center gap-2"
                    >
                      <Send size={16} />
                      Send Message
                    </MagneticButton>
                  </div>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Website Footer */}
      <footer className="w-full border-t border-accent-violet/10 py-8 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="gradient-text font-bold text-sm font-display">Harsh Sahu</span>
            <span>·</span>
            <span>JECRC Foundation, Jaipur</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Built with React 18, Three.js, R3F & Tailwind CSS</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} Harsh Sahu. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
