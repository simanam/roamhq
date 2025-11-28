"use client";

import { motion } from "framer-motion";

export function VideoShowcase() {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-midnight to-slate-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-lime font-semibold text-sm uppercase tracking-wider">
            See It In Action
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Your Brand, On The Move
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Watch how your brand travels across highways, through cities, and into the minds of millions.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow effect behind video */}
          <div className="absolute -inset-4 bg-gradient-to-r from-electric-indigo/30 via-lime/20 to-cyan/30 rounded-3xl blur-3xl opacity-50" />

          {/* Video wrapper */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/Mockup_05.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(15,23,42,0.4)_100%)]" />
          </div>
        </motion.div>

        {/* Optional caption or stats below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="text-2xl font-bold text-white">1,600 sq ft</div>
            <div className="text-sm text-slate-400">Advertising space per trailer</div>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">50,000+</div>
            <div className="text-sm text-slate-400">Daily impressions per truck</div>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-sm text-slate-400">GPS tracking & reporting</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
