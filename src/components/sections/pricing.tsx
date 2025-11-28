"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWaitlist } from "@/context/waitlist-context";

const plans = [
  {
    name: "Starter",
    subtitle: "Regional Sprint",
    price: "2,500",
    period: "/month",
    description: "Perfect for testing markets or regional campaigns",
    features: [
      "1-3 Trucks",
      "30-Day Flight",
      "Basic Reporting",
      "Email Support",
      "Creative Templates",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    subtitle: "Multi-Market",
    price: "8,500",
    period: "/month",
    description: "Scale your reach across multiple markets",
    features: [
      "5-10 Trucks",
      "60-Day Flight",
      "Full Dashboard Access",
      "Priority Support",
      "Route Optimization",
      "Custom Creative",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    subtitle: "National Network",
    price: "Custom",
    period: "",
    description: "Full-scale national campaigns with dedicated support",
    features: [
      "20+ Trucks",
      "Custom Duration",
      "Dedicated Account Manager",
      "Custom Integrations",
      "API Access",
      "White-Label Reports",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  const { openWaitlist } = useWaitlist();

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-midnight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Campaign packages that scale with your goals. All packages include
            creative design, installation, GPS tracking, and removal.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-8 transition-shadow",
                plan.highlighted
                  ? "bg-midnight text-white shadow-xl scale-105"
                  : "bg-white border border-slate-200 hover:shadow-lg"
              )}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-lime text-midnight text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3
                  className={cn(
                    "text-xl font-bold",
                    plan.highlighted ? "text-white" : "text-midnight"
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.highlighted ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {plan.subtitle}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span
                  className={cn(
                    "text-4xl font-bold font-display",
                    plan.highlighted ? "text-white" : "text-midnight"
                  )}
                >
                  {plan.price === "Custom" ? "" : "$"}
                  {plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    plan.highlighted ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className={cn(
                  "text-sm mb-6",
                  plan.highlighted ? "text-slate-400" : "text-slate-500"
                )}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check
                      className={cn(
                        "w-5 h-5 shrink-0",
                        plan.highlighted ? "text-lime" : "text-electric-indigo"
                      )}
                    />
                    <span
                      className={plan.highlighted ? "text-slate-300" : "text-slate-600"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={cn(
                  "w-full",
                  plan.highlighted
                    ? "bg-lime text-midnight hover:bg-lime/90"
                    : ""
                )}
                variant={plan.highlighted ? "primary" : "outline"}
                onClick={openWaitlist}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Additional notes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-slate-500 space-y-1"
        >
          <p>Custom packages available for specific routes or markets.</p>
          <p>Agency rates available for multi-client campaigns.</p>
        </motion.div>
      </div>
    </section>
  );
}
