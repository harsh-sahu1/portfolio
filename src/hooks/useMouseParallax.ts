import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export function useMouseParallax() {
  const setMouse = useAppStore((s) => s.setMouse);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setMouse]);
}
