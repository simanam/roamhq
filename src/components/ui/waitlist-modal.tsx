"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, Building2, Truck, ArrowRight } from "lucide-react";
import { useWaitlist, WaitlistType } from "@/context/waitlist-context";
import { Button } from "./button";

export function WaitlistModal() {
  const { isOpen, waitlistType, closeWaitlist } = useWaitlist();
  const [currentType, setCurrentType] = useState<WaitlistType>(waitlistType);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fleetSize, setFleetSize] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Update currentType when waitlistType changes
  useEffect(() => {
    setCurrentType(waitlistType);
  }, [waitlistType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const payload = currentType === "brand"
      ? { type: "brand", name, email, brandName }
      : { type: "fleet", name, email, companyName, fleetSize };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      setIsSuccess(true);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setBrandName("");
    setCompanyName("");
    setFleetSize("");
  };

  const handleClose = () => {
    closeWaitlist();
    setTimeout(() => {
      setIsSuccess(false);
      setError("");
      setCurrentType(waitlistType);
      resetForm();
    }, 300);
  };

  const selectType = (type: WaitlistType) => {
    setCurrentType(type);
  };

  const getHeaderGradient = () => {
    if (currentType === "brand") return "from-electric-indigo to-cyan";
    if (currentType === "fleet") return "from-lime to-cyan";
    return "from-electric-indigo via-cyan to-lime";
  };

  const getTitle = () => {
    if (isSuccess) return "You're on the list!";
    if (currentType === "choose") return "Join the Waitlist";
    if (currentType === "brand") return "Launch Your Campaign";
    return "Join the Fleet Network";
  };

  const getSubtitle = () => {
    if (isSuccess) return "We'll be in touch soon.";
    if (currentType === "choose") return "Are you a brand or a fleet?";
    if (currentType === "brand") return "Get your brand on the road.";
    return "Start earning from your trucks.";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
              {/* Header */}
              <div className={`bg-gradient-to-r ${getHeaderGradient()} p-6 relative`}>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-white">
                  {getTitle()}
                </h2>
                <p className="text-white/80 mt-1">
                  {getSubtitle()}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-lime" />
                    </div>
                    <p className="text-slate-600">
                      {currentType === "brand"
                        ? "Thanks for your interest! We'll reach out to get your brand on the road."
                        : "Thanks for joining! We'll be in touch about fleet opportunities."}
                    </p>
                    <Button onClick={handleClose} className="mt-6">
                      Close
                    </Button>
                  </motion.div>
                ) : currentType === "choose" ? (
                  // Type Selection View
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => selectType("brand")}
                      className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-electric-indigo hover:bg-electric-indigo/5 transition-all group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-electric-indigo/10 rounded-full flex items-center justify-center group-hover:bg-electric-indigo/20 transition-colors">
                          <Building2 className="w-6 h-6 text-electric-indigo" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-midnight">I&apos;m a Brand</h3>
                          <p className="text-sm text-slate-500">I want to advertise on trucks</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-electric-indigo transition-colors" />
                      </div>
                    </button>

                    <button
                      onClick={() => selectType("fleet")}
                      className="w-full p-4 border-2 border-slate-200 rounded-xl hover:border-lime hover:bg-lime/5 transition-all group text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-lime/10 rounded-full flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                          <Truck className="w-6 h-6 text-lime" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-midnight">I&apos;m a Fleet</h3>
                          <p className="text-sm text-slate-500">I want to earn from my trucks</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-lime transition-colors" />
                      </div>
                    </button>
                  </motion.div>
                ) : currentType === "brand" ? (
                  // Brand Form
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="brandName" className="block text-sm font-medium text-slate-700 mb-1">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        id="brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Acme Inc."
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@acme.com"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-indigo focus:border-transparent transition-all"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Get Started"
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setCurrentType("choose")}
                      className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      ← Back to selection
                    </button>
                  </motion.form>
                ) : (
                  // Fleet Form
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Smith"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Smith Trucking LLC"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="fleetSize" className="block text-sm font-medium text-slate-700 mb-1">
                        Fleet Size
                      </label>
                      <select
                        id="fleetSize"
                        value={fleetSize}
                        onChange={(e) => setFleetSize(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-all"
                      >
                        <option value="">Select fleet size</option>
                        <option value="1-5">1-5 trucks</option>
                        <option value="6-20">6-20 trucks</option>
                        <option value="21-50">21-50 trucks</option>
                        <option value="51-100">51-100 trucks</option>
                        <option value="100+">100+ trucks</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@smithtrucking.com"
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime focus:border-transparent transition-all"
                      />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button
                      type="submit"
                      className="w-full bg-lime text-midnight hover:bg-lime/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Join the Network"
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setCurrentType("choose")}
                      className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      ← Back to selection
                    </button>
                  </motion.form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
