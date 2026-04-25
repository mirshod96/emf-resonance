import React from 'react';
import { motion } from 'framer-motion';

export const TissueVisualizer = ({ frequency, modality }) => {
  // Map frequency (0-100) to a depth value
  // Let's say max depth is Y=400 (bone), min depth is Y=100 (skin)
  // Higher frequency = less depth (superficial). So frequency 100 = depth 100. freq 0 = depth 400.
  const depth = 400 - (frequency * 3);

  // Determine color based on modality
  let waveColor = '#06b6d4'; // cyan
  if (modality === 'Microwave Therapy') waveColor = '#f97316'; // orange/heat
  if (modality === 'Magnetotherapy') waveColor = '#8b5cf6'; // purple

  return (
    <div className="relative w-full h-[300px] bg-black border border-cybermed-slate rounded-xl overflow-hidden flex items-end">
      {/* Tissue Layers */}
      <div className="absolute top-0 w-full h-1/4 bg-amber-900/40 border-b border-amber-900/60 flex items-center justify-center text-xs font-bold text-amber-500/50">SKIN / EPIDERMIS</div>
      <div className="absolute top-1/4 w-full h-1/4 bg-yellow-900/30 border-b border-yellow-900/50 flex items-center justify-center text-xs font-bold text-yellow-500/40">SUBCUTANEOUS FAT</div>
      <div className="absolute top-2/4 w-full h-1/4 bg-red-900/40 border-b border-red-900/50 flex items-center justify-center text-xs font-bold text-red-500/50">MUSCLE TISSUE</div>
      <div className="absolute top-3/4 w-full h-1/4 bg-slate-100/10 flex items-center justify-center text-xs font-bold text-white/30">BONE</div>

      {/* SVG Waves */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="none">
        <motion.path
          d={`M 0 0 C 125 100, 375 -100, 500 0`}
          stroke={waveColor}
          strokeWidth="4"
          fill="none"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: depth, opacity: 0.8 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ filter: `drop-shadow(0px 0px 10px ${waveColor})` }}
        />
        {/* Animated multiple waves to simulate oscillating field */}
        <motion.path
          d={`M 0 0 C 125 -100, 375 100, 500 0`}
          stroke={waveColor}
          strokeWidth="2"
          fill="none"
          animate={{ 
             y: [depth - 20, depth + 20, depth - 20],
             opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0px 0px 5px ${waveColor})` }}
        />
      </svg>
      
      {/* Depth Indicator Line */}
      <motion.div 
        className="absolute w-full border-t border-dashed border-white/50 z-10 pointer-events-none"
        animate={{ top: `${(depth / 500) * 100}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <span className="bg-black text-xs text-white px-2 py-1 rounded ml-2">Estimated Depth</span>
      </motion.div>
    </div>
  );
};
