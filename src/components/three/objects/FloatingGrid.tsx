import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Tier = 'high' | 'medium' | 'low';

interface FloatingGridProps {
  tier: Tier;
}

export default function FloatingGrid({ tier }: FloatingGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (tier === 'low' || !meshRef.current) return;
    // Subtle up-down float
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    // Very slow y rotation
    meshRef.current.rotation.z += 0.0005;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial
        wireframe
        color="#6C63FF"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
