import React, { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

type TextElement = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: TextElement;
  delay?: number;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedText({
  text,
  className = '',
  element = 'p',
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });

  const words = text.split(' ');

  const MotionTag = motion[element as keyof typeof motion] as React.ComponentType<
    React.HTMLAttributes<HTMLElement> & {
      variants?: Variants;
      initial?: string;
      animate?: string;
      ref?: React.Ref<HTMLElement>;
      style?: React.CSSProperties;
    }
  >;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ display: element === 'span' ? 'inline-flex' : 'flex', flexWrap: 'wrap', gap: '0.3em' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}
