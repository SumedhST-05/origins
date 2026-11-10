import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SneakerModel } from './SneakerModel';
import { StudioLighting } from './StudioLighting';
import { CanvasLoader, CanvasFallbackUI } from './CanvasLoader';
import { Hotspot, ColorOption } from '../../types';
import { RotateCw, Compass, Maximize2, RefreshCw } from 'lucide-react';

interface ProductSneakerCanvasProps {
  modelPath: string;
  selectedColor?: ColorOption | null;
  hotspots?: Hotspot[];
  onHotspotClick?: (hotspot: Hotspot) => void;
  activeHotspotId?: string | null;
}

type CameraAngle = 'perspective' | 'lateral' | 'top' | 'sole' | 'heel';

export const ProductSneakerCanvas: React.FC<ProductSneakerCanvasProps> = ({
  modelPath,
  selectedColor = null,
  hotspots = [],
  onHotspotClick,
  activeHotspotId,
}) => {
  const [autoRotate, setAutoRotate] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentAngle, setCurrentAngle] = useState<CameraAngle>('perspective');
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const setAngle = (angle: CameraAngle) => {
    setCurrentAngle(angle);
    setAutoRotate(false);
    if (!controlsRef.current) return;

    // Reset target to origin
    controlsRef.current.target.set(0, 0, 0);

    const camera = controlsRef.current.object;
    switch (angle) {
      case 'perspective':
        camera.position.set(2.4, 1.2, 3.2);
        break;
      case 'lateral':
        camera.position.set(0, 0.4, 3.8);
        break;
      case 'top':
        camera.position.set(0.1, 4.2, 0.5);
        break;
      case 'sole':
        camera.position.set(0.1, -3.8, 1.2);
        break;
      case 'heel':
        camera.position.set(-3.2, 0.8, -1.2);
        break;
    }
    controlsRef.current.update();
  };

  const resetView = () => {
    setAngle('perspective');
  };

  if (hasError) {
    return <CanvasFallbackUI onRetry={() => setHasError(false)} />;
  }

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] bg-neutral-50/70 rounded-3xl border border-neutral-200/70 overflow-hidden select-none">
      <Canvas
        shadows
        camera={{ position: [2.4, 1.2, 3.2], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <StudioLighting shadowOpacity={0.4} shadowY={-1.1} />

          <SneakerModel
            modelPath={modelPath}
            autoRotate={autoRotate}
            rotationSpeed={0.5}
            scaleFactor={1.0}
            interactiveParallax={false}
            selectedColor={selectedColor}
            hotspots={hotspots}
            onHotspotClick={onHotspotClick}
            activeHotspotId={activeHotspotId}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={6.0}
            dampingFactor={0.06}
            rotateSpeed={0.8}
            onStart={() => setAutoRotate(false)}
          />
        </Suspense>
      </Canvas>

      {/* Angle Presets Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-sm">
        {(
          [
            { id: 'perspective', label: '3/4 View' },
            { id: 'lateral', label: 'Profile' },
            { id: 'top', label: 'Top-Down' },
            { id: 'sole', label: 'Outsole' },
            { id: 'heel', label: 'Heel' },
          ] as { id: CameraAngle; label: string }[]
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setAngle(item.id)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
              currentAngle === item.id
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
            autoRotate
              ? 'bg-brown-600 text-white'
              : 'bg-white/90 backdrop-blur-md text-neutral-700 hover:bg-white border border-neutral-200/80'
          }`}
          title="Toggle Auto Spin"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="text-[11px]">360°</span>
        </button>

        <button
          onClick={resetView}
          className="p-2 rounded-full bg-white/90 backdrop-blur-md text-neutral-600 hover:text-neutral-900 border border-neutral-200/80 shadow-sm transition-all"
          title="Reset Camera"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-neutral-200/60 pointer-events-none">
        <Compass className="w-3 h-3 text-brown-500" />
        <span>TOUCH &bull; ROTATE 360 &bull; PINCH ZOOM</span>
      </div>
    </div>
  );
};
