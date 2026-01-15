"use client";

import { motion } from "framer-motion";
import { MapPin, Paintbrush, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Plan Your Campaign",
    description:
      "Define your target markets, select geographic corridors, and set your flight duration. We match you with trucks that travel your ideal routes.",
    features: [
      "Geographic targeting by region, state, or corridor",
      "Flexible flight lengths (2 weeks to 12 months)",
      "Route density options (highways vs. urban)",
    ],
    color: "electric-indigo",
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Wrap & Roll",
    description:
      "Our creative team handles design, vinyl production, and professional installation. Your brand hits the road within days.",
    features: [
      "Full-service creative support",
      "Premium 3M vinyl for durability",
      "Nationwide installation network",
    ],
    color: "cyan",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Measure Impact",
    description:
      "Watch your campaign unfold in real-time. GPS tracking shows exactly where your ads travel, with estimated impressions based on traffic data.",
    features: [
      "Real-time GPS location updates",
      "Daily/weekly impression estimates",
      "Exportable reports for stakeholders",
    ],
    color: "lime",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-midnight">
            From Brief to Billboard in Days
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Three simple steps to get your brand on the road and start collecting verifiable impressions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-indigo via-cyan to-lime -translate-y-1/2 z-0" />

          <div className="grid lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-slate-50 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        step.color === "electric-indigo"
                          ? "bg-electric-indigo"
                          : step.color === "cyan"
                          ? "bg-cyan"
                          : "bg-lime"
                      }`}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-slate-400 font-display">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-midnight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 mb-6">{step.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <svg
                          className={`w-5 h-5 shrink-0 ${
                            step.color === "electric-indigo"
                              ? "text-electric-indigo"
                              : step.color === "cyan"
                              ? "text-cyan"
                              : "text-lime"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
