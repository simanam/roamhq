"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TruckPosition {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface MiniMapProps {
  className?: string;
  showRoutes?: boolean;
  animateTrucks?: boolean;
}

const defaultTrucks: TruckPosition[] = [
  { id: 1, x: 78, y: 35, color: "#4F46E5" },  // East coast
  { id: 2, x: 55, y: 28, color: "#84CC16" },  // Midwest
  { id: 3, x: 18, y: 25, color: "#06B6D4" },  // Pacific NW
  { id: 4, x: 22, y: 55, color: "#4F46E5" },  // Southwest
  { id: 5, x: 45, y: 65, color: "#84CC16" },  // Texas
];

export function MiniMap({
  className = "",
  showRoutes = true,
  animateTrucks = true,
}: MiniMapProps) {
  const [trucks, setTrucks] = useState(defaultTrucks);

  useEffect(() => {
    if (!animateTrucks) return;

    const interval = setInterval(() => {
      setTrucks((prev) =>
        prev.map((truck) => ({
          ...truck,
          x: Math.max(10, Math.min(90, truck.x + (Math.random() - 0.5) * 2)),
          y: Math.max(15, Math.min(75, truck.y + (Math.random() - 0.5) * 2)),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [animateTrucks]);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* US Map SVG Background */}
      <svg
        viewBox="0 0 100 70"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="100" height="70" fill="url(#mapGradient)" />

        {/* Grid lines */}
        <g stroke="#334155" strokeWidth="0.1" opacity="0.3">
          {[...Array(10)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 7} x2="100" y2={i * 7} />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="70" />
          ))}
        </g>

        {/* Simplified US outline */}
        <path
          d="M15,20 L20,18 L28,20 L35,17 L42,19 L50,16 L58,18 L65,15 L72,17 L80,15 L85,18 L88,22 L86,30 L88,38 L85,45 L80,52 L72,56 L65,58 L55,60 L48,62 L42,60 L35,58 L28,60 L22,56 L18,50 L15,42 L12,35 L14,28 Z"
          fill="none"
          stroke="#4F46E5"
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Route lines */}
        {showRoutes && (
          <g>
            {/* I-95 Corridor */}
            <path
              d="M78,25 Q80,35 78,45 Q76,52 72,56"
              stroke="url(#routeGradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
              strokeDasharray="2 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="3s"
                repeatCount="indefinite"
              />
            </path>

            {/* I-10 Cross country */}
            <path
              d="M22,55 Q35,58 48,60 Q60,55 72,56"
              stroke="url(#routeGradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
              strokeDasharray="2 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>

            {/* I-70/I-80 */}
            <path
              d="M18,25 Q35,30 55,28 Q70,26 78,35"
              stroke="url(#routeGradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.6"
              strokeDasharray="2 2"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;20"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        )}

        {/* City dots */}
        <g opacity="0.5">
          <circle cx="78" cy="32" r="1" fill="#64748B" /> {/* NYC */}
          <circle cx="55" cy="30" r="1" fill="#64748B" /> {/* Chicago */}
          <circle cx="22" cy="50" r="1" fill="#64748B" /> {/* LA */}
          <circle cx="45" cy="62" r="1" fill="#64748B" /> {/* Houston */}
          <circle cx="18" cy="22" r="1" fill="#64748B" /> {/* Seattle */}
          <circle cx="72" cy="56" r="1" fill="#64748B" /> {/* Miami */}
        </g>
      </svg>

      {/* Animated truck markers */}
      {trucks.map((truck) => (
        <motion.div
          key={truck.id}
          className="absolute"
          style={{
            left: `${truck.x}%`,
            top: `${truck.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              background: truck.color,
            }}
            animate={{
              scale: [1, 2],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          {/* Dot */}
          <div
            className="relative w-3 h-3 rounded-full -ml-1.5 -mt-1.5 shadow-lg"
            style={{ background: truck.color }}
          />
        </motion.div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900/60 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-900/40 to-transparent" />
    </div>
  );
}
