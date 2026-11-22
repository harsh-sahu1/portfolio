import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

const ScrollProgress: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  // Smooth out jumpy scroll values with a spring
  const spring = useSpring(scrollProgress, { stiffness: 200, damping: 30, mass: 0.5 });
  const width = useTransform(spring, [0, 1], ['0%', '100%']);

  return (
    <div
      style={{
        position: 'fixed',
        top: '64px', // below the 16 (h-16) navbar
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 40,
        background: 'rgba(255,255,255,0.03)',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          height: '100%',
          width,
          background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
          borderRadius: '0 999px 999px 0',
          boxShadow: '0 0 8px rgba(108, 99, 255, 0.6)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
