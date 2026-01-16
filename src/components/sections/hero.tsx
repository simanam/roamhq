"use client";

import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { motion } from "framer-motion";
import { TrendingUp, Truck } from "lucide-react";
import Image from "next/image";
import { useWaitlist } from "@/context/waitlist-context";

export function Hero() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#111827]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

        {/* Animated route lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="routeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
              <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Animated path 1 */}
          <motion.path
            d="M-100,300 Q200,250 400,350 T800,300 T1200,350 T1600,300"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          {/* Animated path 2 */}
          <motion.path
            d="M-100,500 Q300,450 500,550 T900,500 T1300,550 T1700,500"
            stroke="url(#routeGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Floating pulse dots - decorative */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-electric-indigo rounded-full"
          aria-hidden="true"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-electric-indigo rounded-full"
          aria-hidden="true"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/2 w-2.5 h-2.5 bg-electric-indigo rounded-full"
          aria-hidden="true"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, delay: 1, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              MEDIA INFRASTRUCTURE FOR THE PHYSICAL ECONOMY
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl">
              The digital world is crowded. The supply chain is not. We deploy massive brand assets on high-velocity freight corridors.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => openWaitlist("brand")}>VIEW ROUTE MAP</Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => openWaitlist("brand")}>
                INQUIRE FOR CAPACITY
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Container Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Container Image */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
              >
                <Image
                  src="/raom-container.png"
                  alt="Roam branded shipping container on highway"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                  priority
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Decorative glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-electric-indigo/30 via-electric-indigo/10 to-electric-indigo/30 rounded-3xl blur-3xl -z-10" />
            </div>

            {/* Floating Metric Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-8 top-1/4 hidden lg:block"
            >
              <MetricCard
                label="Today's Impressions"
                value={18420}
                icon={<TrendingUp className="w-4 h-4" />}
                trend={12}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -right-4 bottom-1/4 hidden lg:block"
            >
              <MetricCard
                label="Miles Today"
                value={847}
                suffix=" mi"
                icon={<Truck className="w-4 h-4" />}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
