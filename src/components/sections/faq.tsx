"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Campaign Questions",
    questions: [
      {
        q: "What's the minimum campaign length?",
        a: "Our minimum campaign length is 2 weeks. However, we recommend at least 30 days to gather meaningful data and maximize your reach across target markets.",
      },
      {
        q: "How quickly can a campaign launch?",
        a: "Once creative is approved, we can have trucks wrapped and on the road within 7-10 business days. Rush options are available for time-sensitive campaigns.",
      },
      {
        q: "Can I target specific cities or highways?",
        a: "Yes! You can target by region, state, city, or specific highway corridors. Our platform matches your campaign to trucks that regularly travel your target routes.",
      },
      {
        q: "How are impressions calculated?",
        a: "We use GPS data combined with traffic density information from the Department of Transportation to estimate daily impressions. Factors include route type, time of day, and seasonal traffic patterns.",
      },
    ],
  },
  {
    category: "Creative Questions",
    questions: [
      {
        q: "Do you provide design services?",
        a: "Yes! Our creative team can design your trailer wrap from scratch or adapt existing brand assets. Design services are included in all campaign packages.",
      },
      {
        q: "What are the wrap specifications?",
        a: "Standard 53-foot trailers provide approximately 1,600 sq ft of advertising space. We provide design templates with safe zones, bleed areas, and resolution requirements.",
      },
      {
        q: "How durable are the wraps?",
        a: "We use premium 3M vinyl rated for 5-7 years of outdoor use. Wraps are designed to withstand highway conditions, weather, and regular washing.",
      },
    ],
  },
  {
    category: "Tracking Questions",
    questions: [
      {
        q: "How often is GPS data updated?",
        a: "GPS positions are updated every 30 seconds and displayed in your dashboard. Daily and weekly summaries are automatically generated for your reports.",
      },
      {
        q: "Can I access the dashboard on mobile?",
        a: "Yes! Our dashboard is fully responsive and works on any device. We also offer push notifications for campaign milestones and alerts.",
      },
      {
        q: "Is the data exportable?",
        a: "Absolutely. Export reports in PDF or CSV format anytime. Enterprise plans also include API access for integration with your existing analytics tools.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-midnight pr-8">{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-slate-400 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-500">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-midnight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Everything you need to know about running campaigns with RoamHQ.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-electric-indigo mb-4">
                {category.category}
              </h3>
              <div className="bg-slate-50 rounded-xl px-6">
                {category.questions.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
