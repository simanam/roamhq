"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Route, Wrench, DollarSign, Shield, Truck, ArrowRight } from "lucide-react";
import { useWaitlist } from "@/context/waitlist-context";

const benefits = [
  {
    icon: Route,
    title: "Zero Route Changes",
    description: "Keep running your lanes. We match brands to your existing coverage.",
  },
  {
    icon: Wrench,
    title: "Hassle-Free Program",
    description: "We handle brand matching, wrap installation, and removal. You just drive.",
  },
  {
    icon: DollarSign,
    title: "Monthly Payouts",
    description: "Earn $500-$1,500+ per truck monthly, deposited directly.",
  },
  {
    icon: Shield,
    title: "Quality Partners",
    description: "We work with established brands—no sketchy advertisers on your equipment.",
  },
];

const stats = [
  { label: "Avg. earnings/truck", value: "$850", suffix: "/mo" },
  { label: "Avg. wrap duration", value: "8", suffix: " months" },
  { label: "Fleet satisfaction", value: "97", suffix: "%" },
];

export function ForFleets() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="for-fleets" className="py-24 bg-midnight relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-lime font-semibold text-sm uppercase tracking-wider">
              For Fleets
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
              Your Trucks Are Already Moving
            </h2>
            <p className="mt-2 text-xl text-cyan">Now They Can Earn</p>

            <p className="mt-6 text-lg text-slate-400">
              Join 200+ carriers earning passive income from their existing routes.
              No detours. No downtime. Just revenue.
            </p>

            {/* Benefits */}
            <div className="mt-10 space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 bg-lime/10 rounded-lg flex items-center justify-center shrink-0">
                    <benefit.icon className="w-5 h-5 text-lime" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <Button size="lg" className="bg-lime text-midnight hover:bg-lime/90" onClick={() => openWaitlist("fleet")}>
                Join the Network
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Earnings Card */}
            <div className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-2xl p-8">
              {/* Before/After comparison mockup */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Plain Truck */}
                <div className="bg-slate-900/50 rounded-xl p-4 text-center">
                  <div className="w-full aspect-[2/1] bg-slate-700/50 rounded-lg flex items-center justify-center mb-3">
                    <Truck className="w-12 h-12 text-slate-500" />
                  </div>
                  <span className="text-slate-500 text-sm">Before</span>
                  <div className="text-white font-display text-lg">$0/mo</div>
                </div>
                {/* Wrapped Truck */}
                <div className="bg-gradient-to-br from-electric-indigo/20 to-cyan/20 rounded-xl p-4 text-center border border-electric-indigo/30">
                  <div className="w-full aspect-[2/1] bg-gradient-to-r from-electric-indigo to-cyan rounded-lg flex items-center justify-center mb-3">
                    <Truck className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-electric-indigo text-sm">With Roam</span>
                  <div className="text-white font-display text-lg">$850+/mo</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-white font-display">
                      {stat.value}
                      <span className="text-lime">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial snippet */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-slate-300 italic text-sm">
                  &quot;We&apos;ve added $3,200/month to our bottom line without changing a single route. The extra income has been a game-changer.&quot;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    JM
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">John Martinez</div>
                    <div className="text-slate-500 text-xs">Owner-Operator, 4 trucks</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-lime/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
