import React from 'react';
import { motion } from 'motion/react';

export default function Convectiva({ progress }: { progress: number }) {
  // 0-25: Sun heats ground
  const heatProgress = Math.min(progress / 25, 1);
  const heatOpacity = heatProgress * 0.7;

  // 25-50: Air rises
  const riseProgress = Math.max(0, Math.min((progress - 25) / 25, 1));
  const riseOpacity = riseProgress;
  const riseY = riseProgress * -60;

  // 50-75: Cloud forms
  const cloudProgress = Math.max(0, Math.min((progress - 50) / 25, 1));
  const cloudOpacity = cloudProgress;
  const cloudScale = 0.5 + (cloudProgress * 0.5);

  // 75-100: Rain
  const rainProgress = Math.max(0, Math.min((progress - 75) / 25, 1));
  const rainOpacity = rainProgress;

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full bg-sky-50 rounded-xl overflow-hidden">
      {/* Ground */}
      <rect x="0" y="350" width="800" height="50" fill="#92400e" />
      <motion.rect x="0" y="340" width="800" height="10" fill="#ea580c" animate={{ opacity: heatOpacity }} transition={{ duration: 0.1 }} />

      {/* Sun */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} transform="translate(100, 80)">
        <circle cx="0" cy="0" r="30" fill="#fbbf24" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="0" y1="-40" x2="0" y2="-55" stroke="#fbbf24" strokeWidth="4" transform={`rotate(${i * 45})`} />
        ))}
      </motion.g>

      {/* Heat waves */}
      <motion.g animate={{ opacity: heatOpacity }} transition={{ duration: 0.1 }}>
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={`heat-${i}`}
            d={`M ${100 + i * 65} 340 Q ${115 + i * 65} 320 ${100 + i * 65} 300 T ${100 + i * 65} 260`}
            stroke="#ef4444" strokeWidth="3" fill="none"
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
          />
        ))}
        <text x="260" y="380" fill="#fff" fontSize="16" fontWeight="bold">Superfície terrestre muito quente</text>
      </motion.g>

      {/* Air Rising */}
      <motion.g animate={{ y: riseY, opacity: riseOpacity }} transition={{ duration: 0.1 }}>
        <path d="M 350 280 Q 400 280 400 180" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <polygon points="400,175 395,185 405,185" fill="#dc2626" />
        
        <path d="M 450 280 Q 400 280 400 180" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        
        <text x="420" y="230" fill="#991b1b" fontSize="14" fontWeight="bold">Ar convergente e ascendente</text>
      </motion.g>

      {/* Cumulonimbus Cloud */}
      <motion.g animate={{ opacity: cloudOpacity, scale: cloudScale }} style={{ originX: "400px", originY: "150px" }} transition={{ duration: 0.1 }}>
        <path d="M 250 100 Q 250 50 400 40 Q 550 50 550 100 L 500 150 L 300 150 Z" fill="#6b7280" opacity="0.95" />
        <path d="M 300 150 Q 280 150 280 120 Q 280 80 340 80 Q 380 30 440 30 Q 500 30 520 80 Q 560 80 560 120 Q 560 150 500 150 Z" fill="#4b5563" opacity="0.9" />
        <text x="330" y="90" fill="#f3f4f6" fontSize="14" fontWeight="bold">Nuvem Cumulonimbus</text>
      </motion.g>

      {/* Heavy Rain */}
      <motion.g animate={{ opacity: rainOpacity }} transition={{ duration: 0.1 }}>
        {[...Array(25)].map((_, i) => (
          <motion.line key={`rain-${i}`} x1={300 + Math.random()*200} y1={150 + Math.random()*20} x2={300 + Math.random()*200} y2={350} stroke="#2563eb" strokeWidth="3" strokeDasharray="15 15" animate={{ strokeDashoffset: [0, -150] }} transition={{ duration: 0.3 + Math.random()*0.2, repeat: Infinity, ease: "linear" }} />
        ))}
      </motion.g>
    </svg>
  );
}
