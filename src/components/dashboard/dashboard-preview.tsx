"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MapPin,
  TrendingUp,
  Truck,
  Route,
  Eye,
  Calendar,
  ChevronDown,
  Bell,
  Search,
  Settings,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MiniMap } from "@/components/ui/mini-map";

// Simulated truck data
const trucks = [
  { id: "TR-001", brand: "Summer Launch", location: "I-95 near Richmond", miles: 247, impressions: 18420, status: "active" },
  { id: "TR-002", brand: "Summer Launch", location: "I-81 Harrisburg", miles: 312, impressions: 24180, status: "active" },
  { id: "TR-003", brand: "Q4 Campaign", location: "I-70 Columbus", miles: 189, impressions: 14230, status: "active" },
];

// Chart data simulation
const chartData = [
  { day: "Mon", impressions: 42000 },
  { day: "Tue", impressions: 38000 },
  { day: "Wed", impressions: 51000 },
  { day: "Thu", impressions: 47000 },
  { day: "Fri", impressions: 62000 },
  { day: "Sat", impressions: 45000 },
  { day: "Sun", impressions: 39000 },
];

const maxImpressions = Math.max(...chartData.map(d => d.impressions));

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"overview" | "map" | "reports">("overview");
  const [liveImpressions, setLiveImpressions] = useState(324567);
  const [liveMiles, setLiveMiles] = useState(12847);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveImpressions(prev => prev + Math.floor(Math.random() * 50));
      setLiveMiles(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-midnight">
            Real-Time Campaign Intelligence
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Track every mile, measure every impression. Your campaign data, always at your fingertips.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Browser Chrome */}
          <div className="bg-midnight rounded-2xl shadow-2xl shadow-midnight/30 overflow-hidden">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-lime" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-slate-700/50 rounded-md px-4 py-1 text-sm text-slate-400 flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  app.roamhq.co/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex min-h-[400px] sm:min-h-[600px]">
              {/* Sidebar */}
              <div className="w-64 bg-slate-900/50 border-r border-white/5 p-4 hidden lg:block">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-electric-indigo rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                  <span className="text-white font-semibold">RoamHQ</span>
                </div>

                {/* Nav Items */}
                <nav className="space-y-1">
                  {[
                    { icon: Eye, label: "Overview", active: true },
                    { icon: MapPin, label: "Live Map", active: false },
                    { icon: Truck, label: "Fleet", active: false },
                    { icon: Route, label: "Routes", active: false },
                    { icon: TrendingUp, label: "Analytics", active: false },
                    { icon: Calendar, label: "Campaigns", active: false },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                        item.active
                          ? "bg-electric-indigo text-white"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>

                {/* Campaign Card */}
                <div className="mt-8 p-4 bg-slate-800/50 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">Active Campaign</div>
                  <div className="text-white font-medium">Summer Product Launch</div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-lime">67%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-lime rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "67%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-500">23 days remaining</div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 sm:p-6">
                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-white">Dashboard</h1>
                    <p className="text-xs sm:text-sm text-slate-400">Welcome back, here&apos;s your campaign overview</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="bg-slate-800/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 w-48 focus:outline-none focus:border-electric-indigo"
                      />
                    </div>
                    <button className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white relative">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-electric-indigo rounded-full" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <StatCard
                    label="Total Impressions"
                    value={liveImpressions}
                    change={12.5}
                    positive
                  />
                  <StatCard
                    label="Miles Tracked"
                    value={liveMiles}
                    suffix=" mi"
                    change={8.2}
                    positive
                  />
                  <StatCard
                    label="Active Trucks"
                    value={47}
                    change={-2}
                    positive={false}
                  />
                  <StatCard
                    label="Markets Reached"
                    value={23}
                    change={4}
                    positive
                  />
                </div>

                {/* Chart and Map Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
                  {/* Chart */}
                  <div className="lg:col-span-3 bg-slate-800/30 rounded-xl p-4 sm:p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-white font-medium text-sm sm:text-base">Impressions Overview</h3>
                        <p className="text-xs sm:text-sm text-slate-500">Last 7 days</p>
                      </div>
                      <button className="hidden sm:flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                        This Week
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="flex items-end justify-between gap-1 sm:gap-2 h-32 sm:h-40">
                      {chartData.map((item, index) => (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            className="w-full bg-electric-indigo/20 rounded-t-md relative overflow-hidden"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(item.impressions / maxImpressions) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-t from-electric-indigo to-cyan"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            />
                          </motion.div>
                          <span className="text-xs text-slate-500">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini Map */}
                  <div className="lg:col-span-2 bg-slate-800/30 rounded-xl p-4 sm:p-5 border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium text-sm sm:text-base">Live Locations</h3>
                      <button className="text-electric-indigo text-xs sm:text-sm">View Map</button>
                    </div>
                    <div className="aspect-video sm:aspect-square rounded-lg relative overflow-hidden">
                      <MiniMap
                        className="w-full h-full"
                        showRoutes={true}
                        animateTrucks={true}
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-slate-400">Active now</span>
                      <span className="text-white font-medium">47 trucks</span>
                    </div>
                  </div>
                </div>

                {/* Active Trucks Table - hidden on very small screens */}
                <div className="hidden sm:block bg-slate-800/30 rounded-xl border border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5">
                    <h3 className="text-white font-medium text-sm sm:text-base">Active Trucks</h3>
                    <button className="text-electric-indigo text-xs sm:text-sm">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-slate-500 border-b border-white/5">
                          <th className="px-5 py-3 font-medium">Truck ID</th>
                          <th className="px-5 py-3 font-medium">Campaign</th>
                          <th className="px-5 py-3 font-medium">Current Location</th>
                          <th className="px-5 py-3 font-medium">Today&apos;s Miles</th>
                          <th className="px-5 py-3 font-medium">Impressions</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                          <th className="px-5 py-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {trucks.map((truck) => (
                          <tr key={truck.id} className="border-b border-white/5 last:border-0">
                            <td className="px-5 py-4">
                              <span className="text-white font-medium">{truck.id}</span>
                            </td>
                            <td className="px-5 py-4 text-slate-400">{truck.brand}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2 text-slate-400">
                                <MapPin className="w-4 h-4 text-electric-indigo" />
                                {truck.location}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-white font-display">
                              {truck.miles} mi
                            </td>
                            <td className="px-5 py-4 text-white font-display">
                              {truck.impressions.toLocaleString()}
                            </td>
                            <td className="px-5 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-lime/10 text-lime">
                                <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse" />
                                Active
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <button className="text-slate-500 hover:text-white">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-electric-indigo/20 rounded-full blur-3xl" />
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Feature Callouts */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: MapPin, title: "See every truck's exact location", desc: "Real-time GPS tracking updated every 30 seconds" },
            { icon: TrendingUp, title: "Track impressions as they happen", desc: "Estimated impressions based on traffic data" },
            { icon: Route, title: "Export reports with one click", desc: "PDF, CSV, and API access available" },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="w-10 h-10 bg-electric-indigo/10 rounded-lg flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-electric-indigo" />
              </div>
              <div>
                <h4 className="font-semibold text-midnight text-sm sm:text-base">{feature.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  suffix = "",
  change,
  positive,
}: {
  label: string;
  value: number;
  suffix?: string;
  change: number;
  positive: boolean;
}) {
  return (
    <div className="bg-slate-800/30 rounded-xl p-3 sm:p-4 border border-white/5">
      <div className="text-xs sm:text-sm text-slate-400 mb-1 truncate">{label}</div>
      <div className="flex items-baseline gap-1 sm:gap-2">
        <span className="text-lg sm:text-2xl font-bold text-white font-display">
          {value.toLocaleString()}{suffix}
        </span>
        <span
          className={cn(
            "flex items-center text-xs font-medium",
            positive ? "text-lime" : "text-amber"
          )}
        >
          {positive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}
