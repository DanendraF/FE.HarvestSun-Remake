'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ChartCard, LineChartComponent, PieChartComponent } from '@/components/dashboard/ChartComponents';
import { diseaseTrendData, mockDiseaseAlerts } from '@/lib/data/mockData';
import { AlertTriangle, MapPin, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DinasDiseaseIntelligencePage() {
  const diseaseTypes = [
    { name: 'Virus Keriting', value: 12 },
    { name: 'Busuk Akar', value: 8 },
    { name: 'Ulat Grayak', value: 6 },
    { name: 'Karat Daun', value: 4 },
    { name: 'Layu Fusarium', value: 3 },
  ];

  return (
    <DashboardLayout role="dinas" title="Intelijen Penyakit" subtitle="Outbreak tracking dan analisis">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Kasus Aktif</span>
            </div>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Tren Mingguan</span>
            </div>
            <p className="text-2xl font-bold text-red-500">+12%</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Terselesaikan</span>
            </div>
            <p className="text-2xl font-bold text-emerald-500">156</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Wilayah Terdampak</span>
            </div>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Tren Penyakit" subtitle="Kasus baru vs terselesaikan per minggu">
            <LineChartComponent data={diseaseTrendData} dataKeys={['cases', 'resolved']} height={280} />
          </ChartCard>
          <ChartCard title="Distribusi Jenis Penyakit" subtitle="Kasus per jenis penyakit">
            <PieChartComponent data={diseaseTypes} height={280} />
          </ChartCard>
        </div>

        {/* Recent Outbreaks */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Outbreak Terbaru</h3>
          <div className="space-y-3">
            {mockDiseaseAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/20 transition-all">
                <div className={cn(
                  'w-2 h-2 rounded-full shrink-0',
                  alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{(alert as any).diseaseName || (alert as any).disease_name}</p>
                  <p className="text-xs text-muted-foreground">Lahan {(alert as any).farmId || (alert as any).farm_id}</p>
                </div>
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full font-medium shrink-0',
                  alert.severity === 'critical' ? 'bg-red-500/10 text-red-600' :
                  alert.severity === 'high' ? 'bg-amber-500/10 text-amber-600' :
                  'bg-blue-500/10 text-blue-600'
                )}>
                  {alert.severity}
                </span>
                <span className="text-xs text-muted-foreground shrink-0">{new Date((alert as any).detectedAt || (alert as any).detected_at).toLocaleDateString('id-ID')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
