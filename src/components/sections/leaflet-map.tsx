"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TruckData {
  id: number;
  lng: number;
  lat: number;
  brand: string;
  miles: number;
  impressions: number;
  location: string;
}

interface RouteData {
  name: string;
  coords: number[][];
}

interface LeafletMapProps {
  trucks: TruckData[];
  routes: RouteData[];
  selectedTruckId: number | null;
  onTruckClick: (truck: TruckData) => void;
}

export default function LeafletMap({
  trucks,
  routes,
  selectedTruckId,
  onTruckClick,
}: LeafletMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routesRef = useRef<L.Polyline[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Adjust zoom based on screen width for better mobile centering
    const isMobile = window.innerWidth < 768;
    const zoomLevel = isMobile ? 3 : 4;

    // Create map centered on US - disable most zoom interactions but enable keyboard
    const mapInstance = L.map(mapContainer.current, {
      center: [39.8283, -98.5795],
      zoom: zoomLevel,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: true, // Enable keyboard navigation for accessibility
      dragging: isMobile, // Allow dragging on mobile so users can pan
    });

    // Use CartoDB Dark Matter tiles (free, no API key needed)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: isMobile ? 3 : 4,
        minZoom: isMobile ? 3 : 4,
      }
    ).addTo(mapInstance);

    map.current = mapInstance;

    // Handle resize
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newZoom = newIsMobile ? 3 : 4;
      mapInstance.setZoom(newZoom);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mapInstance.remove();
      map.current = null;
    };
  }, []);

  // Draw routes
  useEffect(() => {
    if (!map.current) return;

    // Clear existing routes
    routesRef.current.forEach((route) => route.remove());
    routesRef.current = [];

    // Add new routes
    routes.forEach((route) => {
      const coords = route.coords as L.LatLngExpression[];

      // Glow effect (wider, more transparent line behind)
      const glowLine = L.polyline(coords, {
        color: "#4F46E5",
        weight: 8,
        opacity: 0.2,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map.current!);

      // Main route line
      const mainLine = L.polyline(coords, {
        color: "#4F46E5",
        weight: 3,
        opacity: 0.7,
        lineCap: "round",
        lineJoin: "round",
        dashArray: "10, 6",
      }).addTo(map.current!);

      routesRef.current.push(glowLine, mainLine);
    });
  }, [routes]);

  // Update markers when trucks change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Create custom icon for trucks
    trucks.forEach((truck) => {
      const isSelected = selectedTruckId === truck.id;
      const color = isSelected ? "#84CC16" : "#4F46E5";

      // Create custom HTML marker
      const markerHtml = `
        <div class="truck-marker" style="position: relative; cursor: pointer;">
          <div style="
            position: absolute;
            width: 40px;
            height: 40px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${color};
            border-radius: 50%;
            animation: leafletPulse 2s ease-out infinite;
          "></div>
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            background: ${color};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px ${color}80;
            border: 2px solid rgba(255, 255, 255, 0.2);
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <path d="M15 18H9"/>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="2"/>
            </svg>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "custom-truck-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([truck.lat, truck.lng], { icon })
        .addTo(map.current!)
        .on("click", () => onTruckClick(truck));

      markersRef.current.push(marker);
    });
  }, [trucks, selectedTruckId, onTruckClick]);

  return (
    <>
      <style jsx global>{`
        .custom-truck-marker {
          background: transparent !important;
          border: none !important;
        }
        @keyframes leafletPulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
        .leaflet-container {
          background: #0f172a !important;
          font-family: inherit;
        }
      `}</style>
      <div
        ref={mapContainer}
        className="absolute inset-0"
        role="application"
        aria-label="Interactive map showing truck locations across the United States. Use arrow keys to pan the map."
      />
    </>
  );
}
