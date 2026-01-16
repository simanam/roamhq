"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 2400000, suffix: "+", label: "Impressions Delivered" },
  { value: 850000, suffix: "+", label: "Miles Tracked" },
  { value: 47, suffix: "", label: "Markets Active" },
  { value: 98, suffix: "%", label: "Completion Rate" },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  const formatValue = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <span className="font-display text-5xl sm:text-6xl font-bold text-white">
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}

export function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-indigo/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            The Numbers Speak
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={isInView}
              />
              <div className="mt-2 text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Network Status Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-b border-slate-700/50 py-4"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm font-mono tracking-wider">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 bg-electric-indigo rounded-full animate-pulse" />
              NETWORK STATUS: <span className="text-white">ACTIVE</span>
            </span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-400">
              CURRENT FLEET AVAILABILITY: <span className="text-amber-400">LIMITED</span>
            </span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-400">
              NEXT DEPLOYMENT: <span className="text-white">Q1 2026</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
