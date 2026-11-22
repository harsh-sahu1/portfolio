import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../../store/appStore';

type Tier = 'high' | 'medium' | 'low';

interface NeuralOrbProps {
  tier: Tier;
}

export default function NeuralOrb({ tier }: NeuralOrbProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const wireMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  const mouse = useAppStore((s) => s.mouse);

  useFrame(() => {
    if (tier === 'low') return;

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.001;

      // Lerp toward mouse
      groupRef.current.position.x += (mouse.x * 0.3 - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (mouse.y * 0.2 - groupRef.current.position.y) * 0.05;
    }
  });

  if (tier === 'low') {
    return (
      <group>
        <ambientLight intensity={0.5} />
        <mesh>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshStandardMaterial
            color="#6C63FF"
            transparent
            opacity={0.15}
            emissive="#6C63FF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight color="#6C63FF" intensity={2} position={[2, 2, 2]} />
      <pointLight color="#00D4FF" intensity={1.5} position={[-2, -2, 2]} />

      {/* Outer solid icosahedron */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshStandardMaterial
          color="#6C63FF"
          wireframe={false}
          transparent
          opacity={0.15}
          emissive="#6C63FF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireMeshRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshBasicMaterial
          wireframe
          color="#6C63FF"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[1.0, 4]} />
        <meshStandardMaterial
          emissive="#00D4FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
