import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface SharedCanvasProps {
  children: React.ReactNode;
}

export default function SharedCanvas({ children }: SharedCanvasProps) {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
}
