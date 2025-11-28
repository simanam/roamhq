"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Radio,
  CheckCircle2,
  Maximize2,
  Calendar,
  BarChart3,
  HeartHandshake,
} from "lucide-react";
import { useWaitlist } from "@/context/waitlist-context";

const features = [
  {
    icon: Radio,
    title: "500-1,000 Miles Per Day",
    description:
      "A single wrapped trailer crosses multiple markets daily, reaching audiences across cities, suburbs, and highways.",
  },
  {
    icon: CheckCircle2,
    title: "GPS-Proven Routes",
    description:
      "No estimated coverage areas. Know exactly where your ad traveled with timestamped GPS data.",
  },
  {
    icon: Maximize2,
    title: "1,600+ Sq Ft of Brand Space",
    description:
      "53-foot trailers provide the largest mobile billboard format available. Impossible to miss.",
  },
  {
    icon: Calendar,
    title: "Days to Months",
    description:
      "Launch a 2-week blitz or run year-round. Scale up or down based on performance.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Reporting",
    description:
      "Access your campaign dashboard 24/7. Export reports for stakeholders and optimization.",
  },
  {
    icon: HeartHandshake,
    title: "We Handle Everything",
    description:
      "From creative design to installation to tracking—focus on your brand while we manage logistics.",
  },
];

const industries = [
  "Tech",
  "Food & Beverage",
  "Entertainment",
  "CPG",
  "Automotive",
  "Healthcare",
];

export function ForBrands() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="for-brands" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            For Brands
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-midnight">
            Your Audience Isn&apos;t Standing Still
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Neither Should Your Ads
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
            >
              <div className="w-12 h-12 bg-electric-indigo/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-electric-indigo" />
              </div>
              <h3 className="text-lg font-bold text-midnight mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-slate-500 mb-4">Trusted by brands in:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm font-medium"
              >
                {industry}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" onClick={() => openWaitlist("brand")}>Get Campaign Pricing</Button>
        </motion.div>
      </div>
    </section>
  );
}
