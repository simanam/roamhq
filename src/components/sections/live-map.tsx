"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Truck, MapPin, TrendingUp, Clock, X } from "lucide-react";
import dynamic from "next/dynamic";

// Truck data with real US coordinates
const initialTrucks = [
  {
    id: 1,
    lng: -77.436,
    lat: 37.5407,
    brand: "Summer Launch",
    miles: 247,
    impressions: 18420,
    location: "I-95 near Richmond, VA",
  },
  {
    id: 2,
    lng: -76.8844,
    lat: 40.2732,
    brand: "Summer Launch",
    miles: 312,
    impressions: 24180,
    location: "I-81 Harrisburg, PA",
  },
  {
    id: 3,
    lng: -82.9988,
    lat: 39.9612,
    brand: "Q4 Campaign",
    miles: 189,
    impressions: 14230,
    location: "I-70 Columbus, OH",
  },
  {
    id: 4,
    lng: -90.049,
    lat: 35.1495,
    brand: "Tech Rebrand",
    miles: 423,
    impressions: 31450,
    location: "I-40 Memphis, TN",
  },
  {
    id: 5,
    lng: -95.3698,
    lat: 29.7604,
    brand: "New Product",
    miles: 156,
    impressions: 11820,
    location: "I-10 Houston, TX",
  },
  {
    id: 6,
    lng: -71.0589,
    lat: 42.3601,
    brand: "Summer Launch",
    miles: 289,
    impressions: 21340,
    location: "I-95 Boston, MA",
  },
  {
    id: 7,
    lng: -122.3321,
    lat: 47.6062,
    brand: "Brand Awareness",
    miles: 378,
    impressions: 28910,
    location: "I-5 Seattle, WA",
  },
  {
    id: 8,
    lng: -118.2437,
    lat: 34.0522,
    brand: "West Coast Push",
    miles: 445,
    impressions: 35200,
    location: "I-10 Los Angeles, CA",
  },
  {
    id: 9,
    lng: -87.6298,
    lat: 41.8781,
    brand: "Midwest Campaign",
    miles: 267,
    impressions: 19850,
    location: "I-94 Chicago, IL",
  },
  {
    id: 10,
    lng: -104.9903,
    lat: 39.7392,
    brand: "Mountain Region",
    miles: 398,
    impressions: 27640,
    location: "I-70 Denver, CO",
  },
];

// Highway routes as lat/lng arrays for Leaflet
const highwayRoutes = [
  {
    name: "I-95",
    coords: [
      [42.3601, -71.0589],
      [40.7484, -73.9857],
      [39.9526, -75.1652],
      [39.2904, -76.6122],
      [38.9072, -77.0369],
      [37.5407, -77.436],
      [35.7796, -78.6382],
      [32.0809, -80.8431],
      [25.7617, -80.1918],
    ],
  },
  {
    name: "I-10",
    coords: [
      [34.0522, -118.2437],
      [36.1699, -115.1398],
      [32.2226, -110.9747],
      [35.0844, -106.6504],
      [35.222, -101.8313],
      [29.7604, -95.3698],
      [29.9511, -90.0715],
      [30.4383, -84.2807],
      [30.3322, -81.6557],
    ],
  },
  {
    name: "I-80",
    coords: [
      [37.7749, -122.4194],
      [38.5816, -121.4944],
      [39.5296, -119.7871],
      [40.7608, -111.891],
      [39.7392, -104.9903],
      [40.8136, -96.7026],
      [39.0997, -94.5786],
      [41.8781, -87.6298],
      [39.9612, -82.9988],
      [40.4406, -79.9959],
      [40.7357, -74.1724],
    ],
  },
  {
    name: "I-5",
    coords: [
      [47.6062, -122.3321],
      [45.5152, -122.6765],
      [44.0521, -123.0868],
      [37.7749, -122.4194],
      [34.0522, -118.2437],
      [32.7157, -117.1611],
    ],
  },
  {
    name: "I-35",
    coords: [
      [44.9778, -93.265],
      [41.5868, -93.625],
      [39.0997, -94.5786],
      [35.4676, -97.3308],
      [30.2672, -97.7431],
      [29.4241, -98.4936],
    ],
  },
];

interface TruckData {
  id: number;
  lng: number;
  lat: number;
  brand: string;
  miles: number;
  impressions: number;
  location: string;
}

// Dynamically import the map component to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
      <div className="text-slate-400">Loading map...</div>
    </div>
  ),
});

export function LiveMap() {
  const [selectedTruck, setSelectedTruck] = useState<TruckData | null>(null);
  const [trucks, setTrucks] = useState<TruckData[]>(initialTrucks);
  const [networkStats, setNetworkStats] = useState({
    totalMiles: 12847,
    activeTrucks: 47,
    hourlyImpressions: 8420,
  });

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prev) =>
        prev.map((t) => ({
          ...t,
          lng: t.lng + (Math.random() - 0.5) * 0.15,
          lat: t.lat + (Math.random() - 0.5) * 0.1,
          miles: t.miles + Math.floor(Math.random() * 3),
          impressions: t.impressions + Math.floor(Math.random() * 100),
        }))
      );
      setNetworkStats((prev) => ({
        totalMiles: prev.totalMiles + Math.floor(Math.random() * 10),
        activeTrucks: prev.activeTrucks,
        hourlyImpressions:
          prev.hourlyImpressions + Math.floor(Math.random() * 50),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => highwayRoutes, []);

  return (
    <section id="live-demo" aria-labelledby="live-demo-heading" className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-electric-indigo font-semibold text-sm uppercase tracking-wider">
            Live Demo
          </span>
          <h2 id="live-demo-heading" className="mt-4 text-3xl sm:text-4xl font-bold text-white">
            See Roam In Action
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Watch our network of GPS-tracked trucks travel across the country in
            real-time. Click on any truck to see its campaign details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-midnight rounded-2xl overflow-hidden shadow-2xl">
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-lime rounded-full animate-pulse" />
                <span className="text-white font-medium">
                  Network Live View
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6" aria-live="polite" aria-atomic="true">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-lime" aria-hidden="true" />
                  <span className="text-slate-400">
                    {networkStats.totalMiles.toLocaleString()} miles today
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-electric-indigo" aria-hidden="true" />
                  <span className="text-slate-400">
                    {networkStats.activeTrucks} trucks active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-cyan" aria-hidden="true" />
                  <span className="text-slate-400">
                    {networkStats.hourlyImpressions.toLocaleString()}{" "}
                    impressions/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative aspect-square sm:aspect-video min-h-[400px] sm:min-h-[500px] bg-slate-900 overflow-hidden">
              <LeafletMap
                trucks={trucks}
                routes={routes}
                selectedTruckId={selectedTruck?.id ?? null}
                onTruckClick={setSelectedTruck}
              />

              {/* Backdrop to close on outside click */}
              {selectedTruck && (
                <div
                  className="absolute inset-0 z-[999]"
                  onClick={() => setSelectedTruck(null)}
                />
              )}

              {/* Legend - hidden on mobile */}
              <div className="hidden sm:block absolute top-4 right-4 bg-slate-900/90 backdrop-blur-xl rounded-xl p-4 text-sm z-[1000] border border-white/10">
                <div className="text-white font-medium mb-3">Map Legend</div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-4 h-4 bg-electric-indigo rounded-full shadow-lg shadow-electric-indigo/50" />
                    <span>Active Truck</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-4 h-4 bg-lime rounded-full shadow-lg shadow-lime/50" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-electric-indigo to-cyan rounded" />
                    <span>Route Path</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 text-xs text-slate-500 z-[1000] bg-slate-900/50 px-3 py-1.5 rounded-full backdrop-blur">
                Click any truck for details
              </div>
            </div>

            {/* Selected Truck Card - positioned outside overflow-hidden container */}
            {selectedTruck && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bottom-20 left-4 right-4 sm:bottom-12 sm:left-6 sm:right-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-5 sm:w-72 shadow-2xl z-[1000]"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">
                      {selectedTruck.brand}
                    </div>
                    <div className="text-slate-400 text-xs">
                      Truck #{selectedTruck.id.toString().padStart(3, "0")}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTruck(null)}
                    aria-label="Close truck details"
                    className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3 h-3 text-electric-indigo shrink-0" aria-hidden="true" />
                    <span className="text-xs truncate">{selectedTruck.location}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                    <div className="bg-white/5 rounded-lg p-2">
                      <div className="text-slate-500 text-[10px] uppercase tracking-wide mb-0.5">
                        Miles
                      </div>
                      <div className="text-white font-display font-bold text-base sm:text-lg">
                        {selectedTruck.miles}
                        <span className="text-slate-400 text-[10px] font-normal ml-0.5">
                          mi
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2">
                      <div className="text-slate-500 text-[10px] uppercase tracking-wide mb-0.5">
                        Impressions
                      </div>
                      <div className="text-white font-display font-bold text-base sm:text-lg">
                        {(selectedTruck.impressions / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-center text-slate-400 text-sm mt-4">
            Click on any truck marker to see real-time campaign data
          </p>
        </motion.div>
      </div>
    </section>
  );
}
