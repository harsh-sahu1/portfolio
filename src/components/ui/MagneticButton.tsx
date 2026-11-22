import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

type Variant = 'primary' | 'outline' | 'ghost';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

const variantStyles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
    color: '#ffffff',
    border: 'none',
    fontWeight: 600,
  },
  outline: {
    background: 'transparent',
    color: '#6C63FF',
    border: '1.5px solid #6C63FF',
    fontWeight: 500,
  },
  ghost: {
    background: 'transparent',
    color: '#6B6B8A',
    border: 'none',
    fontWeight: 400,
  },
};

export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Spring-based magnetic position
  const springConfig = { stiffness: 300, damping: 25, mass: 0.8 };
  const rawX = useSpring(0, springConfig);
  const rawY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    rawX.set(offsetX * 8);
    rawY.set(offsetY * 8);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.5rem',
    borderRadius: '0.75rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.9rem',
    letterSpacing: '0.01em',
    position: 'relative',
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    whiteSpace: 'nowrap',
    transition: 'background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
    ...(isHovered && variant === 'outline' ? { background: 'rgba(108, 99, 255, 0.12)' } : {}),
    ...(isHovered && variant === 'ghost' ? { color: '#F0F0FF' } : {}),
    ...(isHovered && variant === 'primary'
      ? { boxShadow: '0 4px 24px rgba(108, 99, 255, 0.45)' }
      : {}),
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...baseStyle,
        x: rawX,
        y: rawY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileTap={disabled ? {} : { scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
