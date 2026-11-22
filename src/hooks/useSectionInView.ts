import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/appStore';

export function useSectionInView(sectionIndex: number) {
  const ref = useRef<HTMLElement>(null);
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionIndex);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionIndex, setActiveSection]);

  return ref;
}
