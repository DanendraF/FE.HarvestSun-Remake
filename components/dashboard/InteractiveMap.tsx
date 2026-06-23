'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Farm } from '@/types';

// Fix for default marker icons in Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface InteractiveMapProps {
  farms: Farm[];
}

export default function InteractiveMap({ farms }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      // Default to Yogyakarta if no farms with coords
      const defaultCenter: L.LatLngTuple = [-7.7956, 110.3695];
      
      const map = L.map(mapRef.current).setView(defaultCenter, 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for farms
    const bounds = L.latLngBounds([]);
    let hasValidCoords = false;

    farms.forEach((farm) => {
      if (farm.latitude && farm.longitude) {
        hasValidCoords = true;
        const marker = L.marker([farm.latitude, farm.longitude]).addTo(map);
        
        // Custom popup content
        const popupContent = `
          <div class="p-2 min-w-[200px]">
            <h3 class="font-bold text-lg mb-1">${farm.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${farm.location}</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span class="text-gray-500 block text-xs">Komoditas</span>
                <span class="font-medium">${farm.cropType}</span>
              </div>
              <div>
                <span class="text-gray-500 block text-xs">Luas</span>
                <span class="font-medium">${farm.size} ha</span>
              </div>
              <div>
                <span class="text-gray-500 block text-xs">Status</span>
                <span class="font-medium capitalize ${farm.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}">${farm.status}</span>
              </div>
              <div>
                <span class="text-gray-500 block text-xs">Kesehatan</span>
                <span class="font-medium ${farm.healthScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}">${farm.healthScore}%</span>
              </div>
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        bounds.extend([farm.latitude, farm.longitude]);
      }
    });

    // Fit map to markers if we have any
    if (hasValidCoords) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup function
    return () => {
      // Don't destroy the map on re-renders, let it be
    };
  }, [farms]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-card">
        <h3 className="font-semibold text-lg">Peta Lahan</h3>
        <p className="text-sm text-muted-foreground">Distribusi dan lokasi lahan Anda</p>
      </div>
      <div ref={mapRef} className="w-full h-[400px] z-0" />
    </div>
  );
}
