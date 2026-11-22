import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const diff = Math.random() * 18 + 7;
        return Math.min(prev + diff, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#020209',
        color: '#F0F0FF',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-6 px-4">
        {/* Animated Initials Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center justify-center w-24 h-24 rounded-2xl"
          style={{
            background: 'rgba(13, 13, 26, 0.7)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            boxShadow: '0 0 35px rgba(108, 99, 255, 0.25)',
          }}
        >
          <span
            className="text-4xl font-extrabold select-none gradient-text"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            HS
          </span>
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: '1px solid rgba(0, 212, 255, 0.4)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-56 h-1.5 rounded-full overflow-hidden bg-bg-secondary border border-accent-violet/20">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
              boxShadow: '0 0 12px rgba(108, 99, 255, 0.8)',
            }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Status text */}
        <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span>INITIALIZING 3D ENVIRONMENT ({Math.round(progress)}%)</span>
        </div>
      </div>
    </motion.div>
  );
}
