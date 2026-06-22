'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockRegionalData } from '@/lib/data/mockData';
import { MapPin, TrendingUp, AlertTriangle, Users, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DinasRegionalMapPage() {
  return (
    <DashboardLayout role="dinas" title="Peta Regional" subtitle="Heatmap lahan dan penyakit per wilayah">
      <div className="space-y-4">
        {/* Map Placeholder */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="aspect-[16/9] rounded-lg bg-accent/50 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Peta Interaktif Regional</p>
              <p className="text-xs text-muted-foreground">Heatmap lahan, penyakit, dan produksi</p>
            </div>
          </div>
        </div>

        {/* Regional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRegionalData.map((region, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-card hover:border-amber-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold">{region.region}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                  {region.active_officers} Penyuluh
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <div>
                    <p className="text-xs font-medium">{region.total_farms}</p>
                    <p className="text-[10px] text-muted-foreground">Lahan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <div>
                    <p className="text-xs font-medium">{region.total_production.toLocaleString('id-ID')} ton</p>
                    <p className="text-[10px] text-muted-foreground">Produksi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  <div>
                    <p className="text-xs font-medium">{region.disease_cases}</p>
                    <p className="text-[10px] text-muted-foreground">Kasus</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-amber-500" />
                  <div>
                    <p className="text-xs font-medium">{region.avg_yield}</p>
                    <p className="text-[10px] text-muted-foreground">ton/ha</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
