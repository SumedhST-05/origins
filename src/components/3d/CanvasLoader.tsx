import React from 'react';
import { Html, useProgress } from '@react-three/drei';

export const CanvasLoader: React.FC = () => {
  const { progress, active, item } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center pointer-events-none select-none text-center min-w-[260px] p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-2xl">
        <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
          {/* Animated luxury spinner */}
          <div className="absolute inset-0 rounded-full border-2 border-brown-200 border-t-brown-600 animate-spin" />
          <div className="w-8 h-8 rounded-full bg-brown-50 flex items-center justify-center">
            <span className="text-[10px] font-mono font-bold text-brown-700">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest font-semibold text-luxury-text">
            Loading Atelier 3D
          </p>
          <p className="text-[10px] text-luxury-muted font-mono tracking-wider truncate max-w-[200px]">
            {active ? (item ? item.split('/').pop() : 'Calibrating Mesh...') : 'Ready'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-neutral-100 rounded-full h-1 mt-3 overflow-hidden">
          <div
            className="bg-brown-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
};

export const CanvasFallbackUI: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'Interactive 3D model could not be loaded directly.',
  onRetry,
}) => {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
      <div className="w-16 h-16 rounded-full bg-brown-100 text-brown-600 flex items-center justify-center mb-4">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <h4 className="text-base font-semibold text-neutral-900 mb-1">3D Presentation Offline</h4>
      <p className="text-xs text-neutral-500 max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs font-semibold px-4 py-2 bg-brown-600 text-white rounded-full hover:bg-brown-700 transition"
        >
          Reload 3D Experience
        </button>
      )}
    </div>
  );
};
