import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ColorOption } from '../../types';
import { CanvasLoader } from './CanvasLoader';

interface ScrollSneakerCanvasProps {
  scrollProgress: number; // 0 to 1 from GSAP ScrollTrigger
  chapterIndex: number;   // 0 (Hero), 1 (Design), 2 (Comfort), 3 (Identity)
  modelPath: string;
  selectedColor?: ColorOption | null;
}

const AnimatedSneaker: React.FC<{
  scrollProgress: number;
  chapterIndex: number;
  modelPath: string;
  selectedColor?: ColorOption | null;
}> = ({ scrollProgress, chapterIndex, modelPath, selectedColor }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(modelPath);

  // Normalize model bounds once
  const { normalizedScene, initialScale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetDim = 3.3;
    const normScale = maxDim > 0 ? targetDim / maxDim : 1;

    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          child.material.roughness = Math.min(Math.max(child.material.roughness ?? 0.6, 0.2), 0.85);
          child.material.metalness = Math.min(child.material.metalness ?? 0.1, 0.35);
          child.material.envMapIntensity = 1.2;
          child.material.needsUpdate = true;
        }
      }
    });

    return { normalizedScene: clone, initialScale: normScale };
  }, [scene]);

  // Colorway tinting
  useMemo(() => {
    if (!normalizedScene || !selectedColor) return;
    const targetColor = new THREE.Color(selectedColor.hex);
    const accentColor = new THREE.Color(selectedColor.accentHex || '#8B5E3C');

    normalizedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = (child.material.name || '').toLowerCase();
        if (matName.includes('shoelaces') || matName.includes('straight_mat.005') || matName.includes('text')) {
          child.material.color.lerp(accentColor, 0.45);
        } else if (matName.includes('leather') || matName.includes('straight_mat.002')) {
          if (selectedColor.name !== 'Pure Obsidian') {
            child.material.color.lerp(targetColor, 0.35);
          }
        }
        child.material.needsUpdate = true;
      }
    });
  }, [normalizedScene, selectedColor]);

  // Dynamic GSAP scroll driven camera/rotation interpolation
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    const t = state.clock.getElapsedTime();
    const p = scrollProgress; // 0 to 1

    // Rotation targets based on scroll timeline
    // At p=0 (Hero): 3/4 heroic tilt
    // At p=0.33 (Chapter 1: The Design): Lateral profile facing left/right
    // At p=0.66 (Chapter 2: The Comfort): Underside/heel perspective
    // At p=1.0 (Chapter 3: The Identity): Majestic elevated 3/4 angle
    let targetRotY = -Math.PI / 4 + p * Math.PI * 2.4;
    let targetRotX = 0.15 + Math.sin(p * Math.PI) * 0.3;
    let targetRotZ = Math.sin(p * Math.PI * 2) * 0.12;

    // Position targets based on scroll (shifts left/right as editorial text appears)
    let targetPosX = 0;
    if (p > 0.15 && p < 0.45) {
      targetPosX = 0.9; // shift right to let "01 — THE DESIGN" breathe on left
    } else if (p >= 0.45 && p < 0.75) {
      targetPosX = -0.9; // shift left to let "02 — THE COMFORT" breathe on right
    } else if (p >= 0.75) {
      targetPosX = 0.6; // shift right for "03 — THE IDENTITY"
    }

    // Add subtle ambient floating bob
    const floatY = Math.sin(t * 1.6) * 0.06;
    const targetPosY = (p > 0.05 ? -0.1 : 0) + floatY;

    // Scale target (scales up slightly during chapters for high-detail inspection)
    const baseScale = initialScale * (1 + Math.sin(p * Math.PI) * 0.18);

    // Smooth lerping for cinematic fluid motion
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.07);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.07);

    // Combine scroll rotation with mouse parallax
    const mouseX = state.mouse.x * 0.2;
    const mouseY = state.mouse.y * 0.15;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX + mouseY, 0.07);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY + mouseX, 0.07);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotZ, 0.07);

    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, baseScale, 0.07)
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={meshRef}>
        <primitive object={normalizedScene} />
      </group>
    </group>
  );
};

export const ScrollSneakerCanvas: React.FC<ScrollSneakerCanvasProps> = ({
  scrollProgress,
  chapterIndex,
  modelPath,
  selectedColor,
}) => {
  return (
    <div className="w-full h-full select-none pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.8, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Studio Key Light */}
          <ambientLight intensity={0.9} />
          <directionalLight
            position={[6, 9, 6]}
            intensity={2.0}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
          />
          {/* Subtle warm rim light */}
          <pointLight position={[-5, 4, -4]} intensity={1.6} color="#B49581" />
          <pointLight position={[0, -2, 3]} intensity={0.5} color="#FFFFFF" />

          {/* High-res Contact Shadow */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.45}
            scale={10}
            blur={2.2}
            far={3.8}
            resolution={1024}
            color="#111111"
          />

          <Environment preset="city" />

          <AnimatedSneaker
            scrollProgress={scrollProgress}
            chapterIndex={chapterIndex}
            modelPath={modelPath}
            selectedColor={selectedColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload('/black_sneakers.glb');
