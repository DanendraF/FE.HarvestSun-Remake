'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ChartCard, BarChartComponent } from '@/components/dashboard/ChartComponents';
import { harvestPredictionData } from '@/lib/data/mockData';
import { TrendingUp, Calendar, Wheat, CheckCircle } from 'lucide-react';

export default function HarvestPredictionPage() {
  const predictions = [
    { crop: 'Padi IR64', farm: 'Lahan Padi A1', predicted: '4.2 ton/ha', date: '20 Apr 2024', confidence: 92, status: 'on_track' },
    { crop: 'Jagung Bisi-2', farm: 'Lahan Jagung B2', predicted: '6.8 ton/ha', date: '25 Mei 2024', confidence: 88, status: 'on_track' },
    { crop: 'Cabai Rawit', farm: 'Lahan Sayur C3', predicted: '12 ton/ha', date: '15 Jun 2024', confidence: 85, status: 'at_risk' },
    { crop: 'Padi Ciherang', farm: 'Lahan Padi D4', predicted: '5.1 ton/ha', date: '25 Apr 2024', confidence: 95, status: 'on_track' },
  ];

  return (
    <DashboardLayout role="farmer" title="Prediksi Panen" subtitle="Estimasi panen dan timeline">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Wheat className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Total Estimasi</span>
            </div>
            <p className="text-2xl font-bold">28.1 ton</p>
            <p className="text-xs text-muted-foreground mt-1">Dari 4 lahan aktif</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Rata-rata Tanggal</span>
            </div>
            <p className="text-2xl font-bold">12 Mei</p>
            <p className="text-xs text-muted-foreground mt-1">Perkiraan musim panen</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Rata-rata Confidence</span>
            </div>
            <p className="text-2xl font-bold">90%</p>
            <p className="text-xs text-muted-foreground mt-1">Akurasi prediksi AI</p>
          </div>
        </div>

        {/* Chart */}
        <ChartCard title="Prediksi vs Aktual" subtitle="Perbandingan hasil panen (ton)">
          <BarChartComponent data={harvestPredictionData} dataKeys={['actual', 'predicted']} />
        </ChartCard>

        {/* Predictions Table */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Detail Prediksi per Lahan</h3>
          <div className="space-y-3">
            {predictions.map((pred, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Wheat className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{pred.crop}</p>
                  <p className="text-xs text-muted-foreground">{pred.farm}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{pred.predicted}</p>
                  <p className="text-xs text-muted-foreground">{pred.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-medium">{pred.confidence}%</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pred.status === 'on_track' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                    {pred.status === 'on_track' ? 'On Track' : 'At Risk'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
