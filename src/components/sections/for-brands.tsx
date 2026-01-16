"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Radio,
  Zap,
} from "lucide-react";
import { useWaitlist } from "@/context/waitlist-context";

const features = [
  {
    icon: Globe,
    title: "NATIONAL SCALE",
    description:
      "53-foot assets moving across primary interstate arteries (I-5, I-80, I-95). Unskippable physical presence.",
  },
  {
    icon: Radio,
    title: "LIVE TELEMETRY",
    description:
      "Real-time asset tracking. Velocity monitoring. Verified route interception. Data, not guesses.",
  },
  {
    icon: Zap,
    title: "HIGH-VELOCITY AUDIENCE",
    description:
      "Targeting the traveler, not the scroller. Dominating the middle mile where digital ads cannot exist.",
  },
];

export function ForBrands() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="for-brands" className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            Physical Media At Scale
          </h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50"
            >
              <div className="w-12 h-12 bg-electric-indigo/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-electric-indigo" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" onClick={() => openWaitlist("brand")}>VIEW ROUTE MAP</Button>
        </motion.div>
      </div>
    </section>
  );
}
