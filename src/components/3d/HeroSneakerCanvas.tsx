import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { SneakerModel } from './SneakerModel';
import { StudioLighting } from './StudioLighting';
import { CanvasLoader, CanvasFallbackUI } from './CanvasLoader';
import { Hotspot, ColorOption } from '../../types';
import { RotateCw, Eye, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface HeroSneakerCanvasProps {
  modelPath: string;
  hotspots?: Hotspot[];
  selectedColor?: ColorOption | null;
  onSelectColor?: (color: ColorOption) => void;
  availableColors?: ColorOption[];
}

export const HeroSneakerCanvas: React.FC<HeroSneakerCanvasProps> = ({
  modelPath,
  hotspots = [],
  selectedColor = null,
  onSelectColor,
  availableColors = [],
}) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [showHotspots, setShowHotspots] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      setAutoRotate(true);
      setActiveHotspotId(null);
    }
  };

  const handleHotspotClick = (hs: Hotspot) => {
    setActiveHotspotId((prev) => (prev === hs.id ? null : hs.id));
    setAutoRotate(false);
  };

  if (hasError) {
    return <CanvasFallbackUI onRetry={() => setHasError(false)} />;
  }

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[720px] select-none">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [2.5, 1.2, 3.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onCreated={() => {
          // Canvas initialized
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={<CanvasLoader />}>
          <StudioLighting shadowOpacity={0.42} shadowY={-1.15} />

          <SneakerModel
            modelPath={modelPath}
            autoRotate={autoRotate}
            rotationSpeed={0.65}
            scaleFactor={1.05}
            interactiveParallax={!autoRotate}
            selectedColor={selectedColor}
            hotspots={showHotspots ? hotspots : []}
            onHotspotClick={handleHotspotClick}
            activeHotspotId={activeHotspotId}
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={2.2}
            maxDistance={5.8}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2 + 0.1}
            dampingFactor={0.06}
            rotateSpeed={0.8}
            onStart={() => setAutoRotate(false)}
          />
        </Suspense>
      </Canvas>

      {/* Floating 3D Controls Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-luxury text-neutral-700 z-10 transition-all duration-300">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
            autoRotate
              ? 'bg-brown-600 text-white shadow-sm'
              : 'hover:bg-neutral-100 text-neutral-700'
          }`}
          title="Toggle 360° Showroom Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{autoRotate ? '360° SPIN' : 'PAUSED'}</span>
        </button>

        <button
          onClick={() => setShowHotspots(!showHotspots)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
            showHotspots
              ? 'bg-neutral-900 text-white'
              : 'hover:bg-neutral-100 text-neutral-600'
          }`}
          title="Toggle Architectural Hotspots"
        >
          <Sparkles className="w-3.5 h-3.5 text-brown-400" />
          <span>{showHotspots ? 'HIDE DETAILS' : 'INSPECT TECH'}</span>
        </button>

        <button
          onClick={resetCamera}
          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-all"
          title="Reset Camera View"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dynamic Colorway Selector Pill */}
      {availableColors.length > 0 && onSelectColor && (
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/80 shadow-sm w-fit">
            <Layers className="w-3 h-3 text-brown-600" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-neutral-600">
              Colorway
            </span>
          </div>
          
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-sm">
            {availableColors.map((color) => {
              const isSelected = selectedColor?.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => onSelectColor(color)}
                  className={`group relative w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-brown-600 ring-offset-2 scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-7 px-2 py-0.5 rounded text-[9px] font-medium bg-neutral-900 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Helper Hint */}
      <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 text-[11px] font-mono tracking-wider text-neutral-400 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200/60 pointer-events-none">
        <Eye className="w-3 h-3 text-brown-600" />
        <span>DRAG TO ROTATE &bull; SCROLL TO ZOOM</span>
      </div>
    </div>
  );
};
