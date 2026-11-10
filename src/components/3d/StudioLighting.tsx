import React from 'react';
import { ContactShadows, Environment } from '@react-three/drei';

interface StudioLightingProps {
  shadowOpacity?: number;
  shadowY?: number;
  environmentPreset?: 'studio' | 'city' | 'apartment' | 'warehouse';
}

export const StudioLighting: React.FC<StudioLightingProps> = ({
  shadowOpacity = 0.5,
  shadowY = -1.15,
  environmentPreset = 'city',
}) => {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.8} />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0001}
      />

      {/* Soft Secondary Fill Light */}
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.9}
        color="#F5ECE6"
      />

      {/* Warm Brown Rim Light to sculpt edge geometry */}
      <pointLight
        position={[0, 4, -5]}
        intensity={2.2}
        color="#B88E6D"
      />

      {/* Under-glow Fill */}
      <pointLight
        position={[0, -2, 2]}
        intensity={0.4}
        color="#FFFFFF"
      />

      {/* Realistic Ground Contact Shadows */}
      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={shadowOpacity}
        scale={10}
        blur={2}
        far={3.5}
        resolution={1024}
        color="#1A1410"
      />

      {/* Subtle Environment Reflection Map */}
      <Environment preset={environmentPreset} />
    </>
  );
};
