import React from 'react';
import { motion } from 'motion/react';

export default function Orografica({ progress }: { progress: number }) {
  // 0-25: Wind approaches
  const approachProgress = Math.min(progress / 25, 1);
  const windX = approachProgress * 100;
  const windOpacity = approachProgress;

  // 25-50: Air rises
  const riseProgress = Math.max(0, Math.min((progress - 25) / 25, 1));
  const riseY = riseProgress * -80;
  const riseX = riseProgress * 80;

  // 50-75: Clouds and Rain
  const cloudProgress = Math.max(0, Math.min((progress - 50) / 25, 1));
  const cloudOpacity = cloudProgress;
  const rainOpacity = cloudProgress;

  // 75-100: Air descends
  const descendProgress = Math.max(0, Math.min((progress - 75) / 25, 1));
  const descendOpacity = descendProgress;
  const descendX = descendProgress * 100;
  const descendY = descendProgress * 100;

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full bg-sky-50 rounded-xl overflow-hidden">
      {/* Ocean */}
      <rect x="0" y="300" width="250" height="100" fill="#0284c7" opacity="0.8" />
      {/* Ground */}
      <rect x="250" y="350" width="550" height="50" fill="#166534" />
      
      {/* Mountain */}
      <path d="M 200 350 Q 350 300 450 100 Q 550 300 700 350 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
      <path d="M 400 180 Q 450 100 480 160 Q 450 190 400 180 Z" fill="#ffffff" opacity="0.9" />

      {/* Labels */}
      <text x="280" y="280" fill="#064e3b" fontSize="16" fontWeight="bold" transform="rotate(-45 280 280)">Barlavento (Húmido)</text>
      <text x="520" y="220" fill="#064e3b" fontSize="16" fontWeight="bold" transform="rotate(45 520 220)">Sotavento (Seco)</text>
      
      {/* Air Approaching & Rising (Windward) */}
      <motion.g animate={{ x: windX + riseX - 100, y: riseY, opacity: windOpacity }} transition={{ duration: 0.1 }}>
        <path d="M 50 280 Q 150 280 250 280" stroke="#2563eb" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <polygon points="255,280 245,275 245,285" fill="#2563eb" />
        <text x="80" y="260" fill="#1e40af" fontSize="14" fontWeight="bold">Ar húmido</text>
      </motion.g>

      {/* Air Descending (Leeward) */}
      <motion.g animate={{ x: descendX, y: descendY, opacity: descendOpacity }} transition={{ duration: 0.1 }}>
        <path d="M 450 150 Q 500 200 550 250" stroke="#ea580c" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <polygon points="555,255 545,250 550,245" fill="#ea580c" transform="rotate(45 550 250)" />
        <text x="500" y="200" fill="#9a3412" fontSize="14" fontWeight="bold">Ar aquece e seca</text>
      </motion.g>

      {/* Clouds */}
      <motion.g animate={{ opacity: cloudOpacity, scale: 0.8 + cloudOpacity * 0.2 }} style={{ originX: "450px", originY: "100px" }} transition={{ duration: 0.1 }}>
        <path d="M 350 120 Q 370 80 420 90 Q 450 50 500 80 Q 540 70 550 110 Q 580 120 560 150 L 360 150 Q 330 140 350 120 Z" fill="#9ca3af" opacity="0.9" />
      </motion.g>

      {/* Rain */}
      <motion.g animate={{ opacity: rainOpacity }} transition={{ duration: 0.1 }}>
        {[...Array(15)].map((_, i) => (
          <motion.line key={i} x1={380 + Math.random()*80} y1={150 + Math.random()*30} x2={360 + Math.random()*80} y2={250 + Math.random()*50} stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -80] }} transition={{ duration: 0.5 + Math.random()*0.3, repeat: Infinity, ease: "linear" }} />
        ))}
      </motion.g>
    </svg>
  );
}
