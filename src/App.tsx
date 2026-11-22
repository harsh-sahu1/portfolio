import { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import SharedCanvas from './components/three/SharedCanvas';
import SceneController from './components/three/SceneController';
import Navbar from './components/ui/Navbar';
import ScrollProgress from './components/ui/ScrollProgress';
import Loader from './components/layout/Loader';
import { useMouseParallax } from './hooks/useMouseParallax';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useDevicePerf } from './hooks/useDevicePerf';

// Lazy load sections
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Hackathons = lazy(() => import('./components/sections/Hackathons'));
const Education = lazy(() => import('./components/sections/Education'));
const Contact = lazy(() => import('./components/sections/Contact'));

function AppContent() {
  return (
    <>
      {/* Fixed 3D canvas behind everything with reactive camera & objects */}
      <SharedCanvas>
        <SceneController />
      </SharedCanvas>

      {/* Scrollable HTML content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <ScrollProgress />
        <main>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Hackathons />
            <Education />
            <Contact />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Activate global hooks
  useMouseParallax();
  useScrollProgress();
  useDevicePerf();

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <Loader key="loader" onComplete={() => setIsLoaded(true)} />
      ) : (
        <AppContent key="app" />
      )}
    </AnimatePresence>
  );
}
