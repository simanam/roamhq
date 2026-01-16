"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useWaitlist } from "@/context/waitlist-context";

export function FinalCTA() {
  const { openWaitlist } = useWaitlist();

  return (
    <section className="py-24 bg-[#111827] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Animated route lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,100 Q200,50 400,100 T800,100 T1200,100"
            stroke="url(#ctaGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
          <motion.path
            d="M0,200 Q300,150 500,200 T900,200 T1400,200"
            stroke="url(#ctaGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Put Your Brand on the Road?
          </h2>
        </motion.div>

        {/* Two-column CTA */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* For Brands */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-electric-indigo/20 rounded-full mb-6">
              <div className="w-10 h-10 bg-electric-indigo rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">For Brands</h3>
            <p className="text-slate-400 mb-6">
              Launch a campaign that moves with your audience.
            </p>
            <Button size="lg" className="w-full" onClick={() => openWaitlist("brand")}>
              Launch Your Campaign
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* For Fleets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-lime/20 rounded-full mb-6">
              <div className="w-10 h-10 bg-lime rounded-full flex items-center justify-center">
                <span className="text-midnight font-bold text-lg">F</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">For Fleets</h3>
            <p className="text-slate-400 mb-6">
              Start earning from the miles you&apos;re already driving.
            </p>
            <Button
              size="lg"
              className="w-full bg-lime text-midnight hover:bg-lime/90"
              onClick={() => openWaitlist("fleet")}
            >
              Join the Network
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate-500 mt-12"
        >
          Your Brand, In Motion.
        </motion.p>
      </div>
    </section>
  );
}
