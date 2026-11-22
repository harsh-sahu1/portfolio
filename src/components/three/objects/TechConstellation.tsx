import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillCategories } from '../../../data/skills';

type Tier = 'high' | 'medium' | 'low';

interface TechConstellationProps {
  tier: Tier;
  active: boolean;
}

interface NodeData {
  position: THREE.Vector3;
  color: string;
  categoryIndex: number;
  skillIndex: number;
}

export default function TechConstellation({ tier, active }: TechConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate node positions in spherical layout
  const { nodes, lineGeometry } = useMemo(() => {
    const nodes: NodeData[] = [];
    const numCategories = skillCategories.length;

    skillCategories.forEach((category, catIdx) => {
      // Polar angle evenly distributed across categories
      const catPhi = ((catIdx + 0.5) / numCategories) * Math.PI; // 0 to PI
      const catTheta = (catIdx / numCategories) * Math.PI * 2;   // 0 to 2PI
      const catRadius = 2.5;

      const catX = catRadius * Math.sin(catPhi) * Math.cos(catTheta);
      const catY = catRadius * Math.cos(catPhi);
      const catZ = catRadius * Math.sin(catPhi) * Math.sin(catTheta);
      const catCenter = new THREE.Vector3(catX, catY, catZ);

      const skills = tier === 'low' ? category.skills.slice(0, 2) : category.skills;

      skills.forEach((_, skillIdx) => {
        const angleOffset = (skillIdx / skills.length) * Math.PI * 2;
        const skillRadius = 0.9;
        // Fan out in a plane perpendicular to the radial direction
        const tangentX = Math.cos(catTheta + angleOffset) * skillRadius;
        const tangentY = Math.sin(catPhi + angleOffset * 0.3) * skillRadius * 0.5;
        const tangentZ = Math.sin(catTheta + angleOffset) * skillRadius;

        const position = new THREE.Vector3(
          catCenter.x + tangentX,
          catCenter.y + tangentY,
          catCenter.z + tangentZ
        );

        nodes.push({
          position,
          color: category.color,
          categoryIndex: catIdx,
          skillIndex: skillIdx,
        });
      });
    });

    // Build line segments connecting nodes within the same category
    const linePositions: number[] = [];

    if (tier !== 'low') {
      // For each category, connect consecutive skill nodes
      skillCategories.forEach((_, catIdx) => {
        const catNodes = nodes.filter((n) => n.categoryIndex === catIdx);
        for (let i = 0; i < catNodes.length - 1; i++) {
          const a = catNodes[i].position;
          const b = catNodes[i + 1].position;
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
        // Also connect last to first to close the loop
        if (catNodes.length > 2) {
          const first = catNodes[0].position;
          const last = catNodes[catNodes.length - 1].position;
          linePositions.push(first.x, first.y, first.z, last.x, last.y, last.z);
        }
      });
    }

    const lineGeo = new THREE.BufferGeometry();
    if (linePositions.length > 0) {
      lineGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
    }

    return { nodes, lineGeometry: lineGeo };
  }, [tier]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.002;
  });

  const baseOpacity = active ? 1.0 : 0.3;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <pointLight color="#6C63FF" intensity={1.5} position={[3, 3, 3]} />
      <pointLight color="#00D4FF" intensity={1.0} position={[-3, -3, 3]} />

      {/* Skill nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={active ? 0.6 : 0.1}
            transparent
            opacity={baseOpacity}
          />
        </mesh>
      ))}

      {/* Line connections (skipped on 'low' tier) */}
      {tier !== 'low' && lineGeometry.attributes.position && (
        <primitive
          object={new THREE.LineSegments(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: '#6C63FF',
              transparent: true,
              opacity: active ? 0.25 : 0.08,
            })
          )}
        />
      )}
    </group>
  );
}
