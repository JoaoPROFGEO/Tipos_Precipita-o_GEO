import React from 'react';
import { motion } from 'motion/react';

export default function Frontal({ progress }: { progress: number }) {
  // 0-25: Cold front moves in
  const coldFrontX = Math.min((progress / 25) * 150, 150);
  
  // 25-50: Warm air rises
  const warmAirProgress = Math.max(0, Math.min((progress - 25) / 25, 1));
  const warmAirY = warmAirProgress * -80;
  const warmAirX = warmAirProgress * 60;

  // 50-75: Clouds form
  const cloudProgress = Math.max(0, Math.min((progress - 50) / 25, 1));
  const cloudOpacity = cloudProgress;
  const cloudScale = 0.8 + (cloudProgress * 0.2);

  // 75-100: Rain falls
  const rainProgress = Math.max(0, Math.min((progress - 75) / 25, 1));
  const rainOpacity = rainProgress;

  return (
    <svg viewBox="0 0 800 400" className="w-full h-full bg-sky-50 rounded-xl overflow-hidden">
      <defs>
        <linearGradient id="coldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="warmGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7"/>
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="350" width="800" height="50" fill="#166534" />

      {/* Ar Frio Anterior (Right) */}
      <path d="M 450 350 L 800 350 L 800 150 Z" fill="url(#coldGrad)" />
      <text x="580" y="320" fill="#1e3a8a" fontSize="16" fontWeight="bold">Ar Frio Anterior</text>

      {/* Ar Quente (Middle) */}
      <motion.g animate={{ x: warmAirX, y: warmAirY }} transition={{ duration: 0.1 }}>
        <path d="M 250 350 L 450 350 L 800 150 L 800 0 L 150 0 L 150 100 Z" fill="url(#warmGrad)" />
        <text x="320" y="250" fill="#991b1b" fontSize="18" fontWeight="bold">Ar Quente</text>
        <path d="M 350 300 L 450 240" stroke="#dc2626" strokeWidth="4" fill="none" strokeDasharray="5 5" />
        <polygon points="455,237 445,235 450,245" fill="#dc2626" transform="rotate(-30 450 240)" />
      </motion.g>

      {/* Ar Frio Posterior (Left) */}
      <motion.g animate={{ x: coldFrontX }} transition={{ duration: 0.1 }}>
        <path d="M -250 350 L 100 350 L 0 100 L -250 100 Z" fill="url(#coldGrad)" />
        <text x="-130" y="320" fill="#1e3a8a" fontSize="16" fontWeight="bold">Ar Frio Posterior</text>
        <path d="M -50 300 L 50 300" stroke="#1d4ed8" strokeWidth="4" fill="none" strokeDasharray="5 5" />
        <polygon points="55,300 45,295 45,305" fill="#1d4ed8" />
      </motion.g>

      {/* Clouds */}
      <motion.g 
        animate={{ opacity: cloudOpacity, scale: cloudScale }} 
        style={{ originX: "500px", originY: "200px" }}
        transition={{ duration: 0.1 }}
      >
        <path d="M 450 200 Q 480 160 520 180 Q 550 140 600 160 Q 630 130 680 150 L 480 250 Z" fill="#9ca3af" opacity="0.9" />
        <path d="M 150 100 Q 180 50 230 70 Q 260 30 310 60 L 200 150 Z" fill="#6b7280" opacity="0.95" />
      </motion.g>

      {/* Rain */}
      <motion.g animate={{ opacity: rainOpacity }} transition={{ duration: 0.1 }}>
        {[...Array(10)].map((_, i) => (
          <motion.line key={`rw-${i}`} x1={500 + i*20} y1={180 + (i%3)*20} x2={480 + i*20} y2={350} stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -50] }} transition={{ duration: 0.5 + Math.random()*0.5, repeat: Infinity, ease: "linear" }} />
        ))}
        {[...Array(15)].map((_, i) => (
          <motion.line key={`rc-${i}`} x1={180 + i*10} y1={100 + (i%4)*20} x2={170 + i*10} y2={350} stroke="#2563eb" strokeWidth="3" strokeDasharray="10 10" animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 0.3 + Math.random()*0.3, repeat: Infinity, ease: "linear" }} />
        ))}
      </motion.g>
    </svg>
  );
}
