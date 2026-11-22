import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

const getFadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function SectionTitle({ label, title, subtitle }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="mb-14 text-center">
      {/* Label */}
      <motion.p
        variants={getFadeUp(0)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#6C63FF',
          marginBottom: '0.75rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '1.5rem',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #6C63FF)',
          }}
        />
        {label}
        <span
          style={{
            display: 'inline-block',
            width: '1.5rem',
            height: '1px',
            background: 'linear-gradient(90deg, #6C63FF, transparent)',
          }}
        />
      </motion.p>

      {/* Title */}
      <motion.h2
        variants={getFadeUp(0.1)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: '#F0F0FF',
          lineHeight: 1.2,
          marginBottom: subtitle ? '1rem' : 0,
        }}
      >
        {title}
        <span
          style={{
            display: 'inline-block',
            marginLeft: '0.1em',
            background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          .
        </span>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={getFadeUp(0.2)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: '#6B6B8A',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative gradient line */}
      <motion.div
        variants={getFadeUp(0.3)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          width: '4rem',
          height: '2px',
          background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
          margin: '1.25rem auto 0',
          borderRadius: '999px',
        }}
      />
    </div>
  );
}
