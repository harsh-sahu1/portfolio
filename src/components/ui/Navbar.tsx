import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAppStore } from '../../store/appStore';

const NAV_LINKS = [
  { label: 'About', href: '#about', index: 1 },
  { label: 'Skills', href: '#skills', index: 2 },
  { label: 'Projects', href: '#projects', index: 3 },
  { label: 'Hackathons', href: '#hackathons', index: 4 },
  { label: 'Education', href: '#education', index: 5 },
  { label: 'Contact', href: '#contact', index: 6 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSectionIndex = useAppStore((s) => s.activeSectionIndex);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        style={{
          background: scrolled
            ? 'rgba(2, 2, 9, 0.75)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-2xl font-bold select-none cursor-pointer"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              background: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            HS
          </motion.a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSectionIndex === link.index;
              return (
                <li key={link.href}>
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg outline-none cursor-pointer"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: isActive ? '#6C63FF' : '#6B6B8A',
                      background: 'transparent',
                      border: 'none',
                    }}
                    whileHover={{ color: '#F0F0FF' }}
                    animate={{ color: isActive ? '#6C63FF' : '#6B6B8A' }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                        style={{
                          width: '60%',
                          background: 'linear-gradient(90deg, #6C63FF, #00D4FF)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer"
            style={{
              background: 'rgba(108, 99, 255, 0.1)',
              border: '1px solid rgba(108, 99, 255, 0.2)',
              color: '#6C63FF',
            }}
            onClick={() => setMobileOpen((o) => !o)}
            whileHover={{ scale: 1.05, background: 'rgba(108, 99, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #6C63FF, #00D4FF, transparent)',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </motion.nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: 'rgba(2, 2, 9, 0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ul className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSectionIndex === link.index;
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => handleNavClick(link.href)}
                      className="text-3xl font-bold cursor-pointer"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: isActive
                          ? 'linear-gradient(135deg, #6C63FF, #00D4FF)'
                          : 'none',
                        WebkitBackgroundClip: isActive ? 'text' : 'unset',
                        WebkitTextFillColor: isActive ? 'transparent' : '#6B6B8A',
                        backgroundClip: isActive ? 'text' : 'unset',
                        border: 'none',
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
