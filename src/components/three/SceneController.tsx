import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/appStore';
import NeuralOrb from './objects/NeuralOrb';
import ParticleField from './objects/ParticleField';
import FloatingGrid from './objects/FloatingGrid';
import TechConstellation from './objects/TechConstellation';

export default function SceneController() {
  const { camera } = useThree();
  const perfTier = useAppStore((s) => s.perfTier);
  const activeSection = useAppStore((s) => s.activeSectionIndex);
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const mouse = useAppStore((s) => s.mouse);

  const heroGroupRef = useRef<THREE.Group>(null);
  const aboutGroupRef = useRef<THREE.Group>(null);
  const skillsGroupRef = useRef<THREE.Group>(null);

  // Target camera coordinates for each section
  const cameraTargets = [
    new THREE.Vector3(0, 0, 5),       // 0: Hero
    new THREE.Vector3(1.2, 0.4, 4.8),   // 1: About
    new THREE.Vector3(0, 0.5, 5.2),     // 2: Skills
    new THREE.Vector3(-1.2, -0.2, 5),   // 3: Projects
    new THREE.Vector3(0.8, -0.5, 4.8),  // 4: Hackathons
    new THREE.Vector3(0, 0, 5),       // 5: Education
    new THREE.Vector3(0, 0.2, 5.2),     // 6: Contact
  ];

  useFrame((_, delta) => {
    if (perfTier === 'low') return;

    // Smoothly damp camera position toward section target + subtle mouse parallax + subtle scroll damp
    const target = cameraTargets[activeSection] || cameraTargets[0];
    const targetX = target.x + mouse.x * 0.4;
    const targetY = target.y + mouse.y * 0.3 - scrollProgress * 0.2;
    const targetZ = target.z;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.5, delta);

    // Look at origin with subtle damp
    camera.lookAt(0, 0, 0);

    // Adjust 3D objects position and visibility based on section
    if (heroGroupRef.current) {
      // In Hero, orb is prominent on the right side on desktop
      const isHero = activeSection === 0;
      const targetOrbX = isHero ? 1.5 : 3.5;
      const targetOrbScale = isHero ? 1.0 : 0.5;
      heroGroupRef.current.position.x = THREE.MathUtils.damp(
        heroGroupRef.current.position.x,
        targetOrbX,
        3.0,
        delta
      );
      heroGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(heroGroupRef.current.scale.x, targetOrbScale, 3.0, delta)
      );
    }

    if (skillsGroupRef.current) {
      // Skills constellation rises when in Skills section
      const isSkills = activeSection === 2;
      const targetScale = isSkills ? 1.0 : 0.001;
      skillsGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(skillsGroupRef.current.scale.x, targetScale, 4.0, delta)
      );
    }

    if (aboutGroupRef.current) {
      // About grid floats and adjusts height
      const isAbout = activeSection === 1;
      const targetY = isAbout ? -1.8 : -4;
      aboutGroupRef.current.position.y = THREE.MathUtils.damp(
        aboutGroupRef.current.position.y,
        targetY,
        3.0,
        delta
      );
    }
  });

  return (
    <>
      {/* Universal ambient particle field */}
      <ParticleField tier={perfTier} />

      {/* Hero Neural Orb */}
      <group ref={heroGroupRef} position={[1.5, 0, 0]}>
        <NeuralOrb tier={perfTier} />
      </group>

      {/* About Floating Grid */}
      <group ref={aboutGroupRef} position={[0, -2, 0]}>
        <FloatingGrid tier={perfTier} />
      </group>

      {/* Skills Constellation */}
      <group ref={skillsGroupRef} position={[0, 0, 0]} scale={0.001}>
        <TechConstellation tier={perfTier} active={activeSection === 2} />
      </group>
    </>
  );
}
