import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: string;
}

/**
 * Converts a hex color (e.g. '#6C63FF') to an rgba string with the given alpha.
 * Falls back to the raw string if it doesn't look like a hex.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return `rgba(108, 99, 255, ${alpha})`;
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true,
  glow = '#6C63FF',
}) => {
  const baseBorder = 'rgba(108, 99, 255, 0.15)';
  const hoverBorder = hexToRgba(glow, 0.4);
  const hoverShadow = `0 8px 40px ${hexToRgba(glow, 0.18)}, 0 0 0 1px ${hoverBorder}`;

  const baseStyle: React.CSSProperties = {
    background: 'rgba(13, 13, 26, 0.6)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${baseBorder}`,
    borderRadius: '1rem',
    position: 'relative',
    overflow: 'hidden',
  };

  if (!hover) {
    return (
      <div className={className} style={baseStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={baseStyle}
      whileHover={{
        borderColor: hoverBorder,
        boxShadow: hoverShadow,
        y: -4,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {/* Subtle inner glow top edge */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${hexToRgba(glow, 0.3)}, transparent)`,
          pointerEvents: 'none',
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
