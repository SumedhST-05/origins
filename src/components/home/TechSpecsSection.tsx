import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap, Layers, RefreshCw, Feather } from 'lucide-react';

export const TechSpecsSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      title: 'HYDROPHOBIC ADAPTIVE KNIT',
      subtitle: 'Upper Shell Architecture',
      desc: 'Seamless zero-waste knit spun with 38% recycled ocean nylon, treated with fluorocarbon-free hydrophobic plasma coating.',
      metric: '48g Weight',
      icon: Feather,
    },
    {
      title: 'CARBON FORGED TORSION SHANK',
      subtitle: 'Internal Chassis Stabilizer',
      desc: '3K twill aeronautical carbon composite bridge placed beneath the medial arch, resisting pronation while slingshotting forward momentum.',
      metric: '185% Rigidity Boost',
      icon: Layers,
    },
    {
      title: 'AETHERFOAM™ SUPERCRITICAL DUAL CORE',
      subtitle: 'Midsole Energy Matrix',
      desc: 'Nitrogen-microfoamed elastomer yielding a tested 78.4% energy rebound rate without foam pack-out degradation over 800 kilometers.',
      metric: '78.4% Energy Return',
      icon: Zap,
    },
    {
      title: 'RADIAL SIPED GEOMETRIC OUTSOLE',
      subtitle: 'Ground Contact Interface',
      desc: 'Custom formulated vulcanized rubber with progressive contact sipes designed to displace surface moisture in under 12 milliseconds.',
      metric: '0.92 Wet Friction Coeff',
      icon: Cpu,
    },
  ];

  return (
    <section id="specifications" className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-brown-600 font-semibold block">
            BIOMECHANICAL ARCHITECTURE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            PRECISION ANATOMY.
          </h2>
          <p className="text-sm text-[#777777] max-w-xl mx-auto">
            Dissecting the four integrated layers that transform our footwear from static luxury leather into high-performance kinetic propulsion.
          </p>
        </div>

        {/* Interactive Layer Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Layer Selector Tabs (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-3">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              const isActive = activeLayer === idx;
              return (
                <div
                  key={layer.title}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl -translate-x-1'
                      : 'bg-[#FAFAFA] text-neutral-800 border-neutral-200/70 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isActive ? 'bg-brown-600 text-white' : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-mono tracking-widest uppercase block ${
                            isActive ? 'text-brown-400' : 'text-neutral-400'
                          }`}
                        >
                          LAYER 0{idx + 1} &bull; {layer.subtitle}
                        </span>
                        <h4 className="text-xs font-bold tracking-wider mt-0.5">
                          {layer.title}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-neutral-800 text-brown-300' : 'bg-white text-neutral-600'
                      }`}
                    >
                      {layer.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Focused Anatomy Visualization Card (Cols 6-12) */}
          <div className="lg:col-span-7 bg-[#FAFAFA] rounded-3xl border border-neutral-200/80 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            {/* Watermark Number */}
            <span className="absolute top-4 right-8 font-editorial text-8xl font-black text-neutral-200/60 select-none pointer-events-none">
              0{activeLayer + 1}
            </span>

            <div className="space-y-4 max-w-lg z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-brown-100 text-brown-800 border border-brown-200">
                ACTIVE SUBSYSTEM INSPECTION
              </span>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {layers[activeLayer].title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {layers[activeLayer].desc}
              </p>
            </div>

            {/* Spec Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-neutral-200/70 z-10 mt-8">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Performance Metric</span>
                <span className="text-sm font-mono font-bold text-brown-600 mt-1 block">
                  {layers[activeLayer].metric}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Tolerance</span>
                <span className="text-sm font-mono font-bold text-neutral-900 mt-1 block">
                  &plusmn;0.05 mm
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Certification</span>
                <span className="text-sm font-mono font-bold text-neutral-900 mt-1 block">
                  ISO-9001 Lab
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
