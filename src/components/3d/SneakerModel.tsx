import React, { useMemo, useRef, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Hotspot, ColorOption } from '../../types';

interface SneakerModelProps {
  modelPath: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  scaleFactor?: number;
  interactiveParallax?: boolean;
  selectedColor?: ColorOption | null;
  hotspots?: Hotspot[];
  onHotspotClick?: (hotspot: Hotspot) => void;
  activeHotspotId?: string | null;
}

export const SneakerModel: React.FC<SneakerModelProps> = ({
  modelPath,
  autoRotate = true,
  rotationSpeed = 0.5,
  scaleFactor = 1,
  interactiveParallax = true,
  selectedColor = null,
  hotspots = [],
  onHotspotClick,
  activeHotspotId,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Load GLTF
  const { scene } = useGLTF(modelPath);

  // Clone scene and normalize bounds
  const { normalizedScene, initialScale } = useMemo(() => {
    const clone = scene.clone(true);

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Center geometry around origin
    clone.position.x = -center.x;
    clone.position.y = -center.y;
    clone.position.z = -center.z;

    // Normalize so longest side is ~3 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetDim = 3.2;
    const normScale = maxDim > 0 ? targetDim / maxDim : 1;

    // Optimize materials and cast/receive shadows
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // Clone material so color modifications don't mutate global cache
          child.material = child.material.clone();
          child.material.roughness = Math.min(Math.max(child.material.roughness ?? 0.6, 0.2), 0.85);
          child.material.metalness = Math.min(child.material.metalness ?? 0.1, 0.4);
          child.material.envMapIntensity = 1.15;
          child.material.needsUpdate = true;
        }
      }
    });

    return { normalizedScene: clone, initialScale: normScale };
  }, [scene]);

  // Apply selected colorway tint if desired
  useMemo(() => {
    if (!normalizedScene || !selectedColor) return;
    
    // If the colorway has an accentHex or custom hex, apply tasteful tint to accent fabrics
    const targetColor = new THREE.Color(selectedColor.hex);
    const accentColor = new THREE.Color(selectedColor.accentHex || '#8B5E3C');

    normalizedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = (child.material.name || '').toLowerCase();
        
        // Target accent parts: laces, straight fabric, stitches, or plastic trims
        if (matName.includes('shoelaces') || matName.includes('straight_mat.005') || matName.includes('text')) {
          child.material.color.lerp(accentColor, 0.45);
        } else if (matName.includes('leather') || matName.includes('straight_mat.002') || matName.includes('fabric_cross')) {
          if (selectedColor.name !== 'Obsidian Noir') {
            child.material.color.lerp(targetColor, 0.35);
          }
        }
        child.material.needsUpdate = true;
      }
    });
  }, [normalizedScene, selectedColor]);

  // Animation frame loop: floating, rotation, mouse parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Subtle floating bob
    groupRef.current.position.y = Math.sin(time * 1.4) * 0.08;

    // Subtle breathing roll
    groupRef.current.rotation.z = Math.sin(time * 0.9) * 0.02;

    // Interactive mouse parallax tilt
    if (interactiveParallax) {
      const targetRotX = (mouse.y * 0.25);
      const targetRotY = autoRotate 
        ? groupRef.current.rotation.y + delta * rotationSpeed 
        : groupRef.current.rotation.y + (mouse.x * 0.4 - groupRef.current.rotation.y) * 0.05;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      
      if (autoRotate) {
        groupRef.current.rotation.y += delta * rotationSpeed * 0.5;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      }
    } else if (autoRotate) {
      groupRef.current.rotation.y += delta * rotationSpeed * 0.5;
    }
  });

  const finalScale = initialScale * scaleFactor;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group
        ref={modelRef}
        scale={[finalScale, finalScale, finalScale]}
        rotation={[0.1, -Math.PI / 4, 0]} // Aesthetic 3/4 hero angle
      >
        <primitive object={normalizedScene} />

        {/* Hotspots */}
        {hotspots.map((hs) => {
          const isActive = activeHotspotId === hs.id;
          return (
            <group key={hs.id} position={hs.position}>
              <Html
                center
                distanceFactor={10}
                zIndexRange={[100, 0]}
              >
                <div className="relative group/hs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onHotspotClick?.(hs);
                    }}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 shadow-lg cursor-pointer ${
                      isActive
                        ? 'bg-brown-600 text-white ring-4 ring-brown-400/40 scale-110'
                        : 'bg-white/95 text-neutral-800 hover:bg-brown-600 hover:text-white ring-2 ring-neutral-300/80 hover:ring-brown-400/50'
                    }`}
                    title={hs.title}
                  >
                    <span className="w-2 h-2 rounded-full bg-current hotspot-pulse" />
                  </button>

                  {/* Hotspot Tooltip */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-xl text-left pointer-events-none transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-1 group-hover/hs:opacity-100 group-hover/hs:scale-100 group-hover/hs:translate-y-0'
                    }`}
                  >
                    <p className="text-[11px] font-bold text-neutral-900 tracking-tight leading-tight">
                      {hs.title}
                    </p>
                    <p className="text-[10px] text-neutral-600 mt-1 leading-snug">
                      {hs.description}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-neutral-200/80 -mt-1" />
                  </div>
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// Preload the default GLTF model
useGLTF.preload('/black_sneakers.glb');
