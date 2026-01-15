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

const testimonials = [
  {
    quote:
      "The GPS tracking changed everything for us. We finally have data to prove our OOH spend is working.",
    author: "Sarah Chen",
    title: "VP Marketing",
    company: "TechStart Inc.",
  },
  {
    quote:
      "Launching in 12 markets simultaneously would have been impossible with traditional billboards. Roam made it simple.",
    author: "Michael Torres",
    title: "Media Director",
    company: "BrandWave Agency",
  },
  {
    quote:
      "The dashboard is incredible. I can show my CEO exactly where our ads are traveling every single day.",
    author: "Jennifer Adams",
    title: "Brand Manager",
    company: "Consumer Goods Co.",
  },
];

export function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20"
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

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-slate-800/30 rounded-2xl p-8 border border-white/5">
            {/* Quote mark */}
            <div className="absolute -top-4 left-8 text-6xl text-electric-indigo/30 font-serif">
              &ldquo;
            </div>

            {/* Testimonial content */}
            <div
              className="relative min-h-[120px]"
              role="region"
              aria-label="Customer testimonials"
              aria-live="polite"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeTestimonial === index ? 1 : 0,
                    display: activeTestimonial === index ? "block" : "none",
                  }}
                  transition={{ duration: 0.5 }}
                  role="tabpanel"
                  id={`testimonial-panel-${index}`}
                  aria-labelledby={`testimonial-tab-${index}`}
                  hidden={activeTestimonial !== index}
                >
                  <p className="text-xl text-slate-300 italic mb-6">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold" aria-hidden="true">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {testimonial.author}
                      </div>
                      <div className="text-slate-500 text-sm">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  role="tab"
                  id={`testimonial-tab-${index}`}
                  aria-selected={activeTestimonial === index}
                  aria-controls={`testimonial-panel-${index}`}
                  aria-label={`Go to testimonial ${index + 1} by ${testimonial.author}`}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeTestimonial === index
                      ? "bg-electric-indigo"
                      : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
