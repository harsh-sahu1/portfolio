import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Tier = 'high' | 'medium' | 'low';

interface ParticleFieldProps {
  tier: Tier;
}

export default function ParticleField({ tier }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const count = tier === 'low' ? 200 : 800;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 20; // x in [-10, 10]
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20; // y in [-10, 10]
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10; // z in [-5, 5]
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += 0.0001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6C63FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
