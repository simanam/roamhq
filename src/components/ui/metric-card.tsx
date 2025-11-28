"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  trend?: number;
  animate?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  suffix = "",
  prefix = "",
  icon,
  trend,
  animate = true,
  className,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate) return;

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
  }, [value, animate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "glass-dark rounded-xl p-4 min-w-[160px]",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lime">{icon}</span>}
        <span className="text-slate-400 text-sm">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl font-bold text-white">
          {prefix}
          {displayValue.toLocaleString()}
          {suffix}
        </span>
        {trend !== undefined && (
          <span
            className={cn(
              "text-xs font-medium",
              trend > 0 ? "text-lime" : "text-amber"
            )}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
