import { create } from 'zustand';

type PerfTier = 'high' | 'medium' | 'low';

interface AppStore {
  mouse: { x: number; y: number };
  scrollProgress: number;
  activeSectionIndex: number;
  perfTier: PerfTier;
  isLoaded: boolean;
  setMouse: (x: number, y: number) => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (index: number) => void;
  setPerfTier: (tier: PerfTier) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  mouse: { x: 0, y: 0 },
  scrollProgress: 0,
  activeSectionIndex: 0,
  perfTier: 'medium',
  isLoaded: false,
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (index) => set({ activeSectionIndex: index }),
  setPerfTier: (tier) => set({ perfTier: tier }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));
