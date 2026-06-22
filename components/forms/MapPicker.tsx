'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLat?: number;
  defaultLng?: number;
}

export default function MapPicker({ onLocationSelect, defaultLat, defaultLng }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to Yogyakarta if no location provided
      const defaultCenter: L.LatLngTuple = [defaultLat || -7.7956, defaultLng || 110.3695];
      
      const map = L.map(mapRef.current).setView(defaultCenter, 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Add default marker if lat/lng exists
      if (defaultLat && defaultLng) {
        markerRef.current = L.marker([defaultLat, defaultLng]).addTo(map);
      }
      
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng]);
        } else {
          markerRef.current = L.marker([lat, lng]).addTo(map);
        }
        
        onLocationSelect(lat, lng);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Don't destroy the map on re-renders, let it be
    };
  }, [onLocationSelect, defaultLat, defaultLng]);

  return (
    <div className="w-full rounded-md border border-input overflow-hidden">
      <div className="bg-muted p-2 text-xs text-muted-foreground border-b border-input">
        Klik pada peta untuk menentukan lokasi lahan
      </div>
      <div ref={mapRef} className="w-full h-[200px] z-0" />
    </div>
  );
}
