'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ChartCard, BarChartComponent, LineChartComponent, AreaChartComponent } from '@/components/dashboard/ChartComponents';
import { productionChartData } from '@/lib/data/mockData';
import { TrendingUp, BarChart3, Calendar } from 'lucide-react';

export default function DinasProductionAnalyticsPage() {
  const yearlyData = [
    { name: '2019', padi: 3800, jagung: 2500, kedelai: 1800 },
    { name: '2020', padi: 4100, jagung: 2700, kedelai: 1900 },
    { name: '2021', padi: 4300, jagung: 2900, kedelai: 2000 },
    { name: '2022', padi: 4600, jagung: 3000, kedelai: 2100 },
    { name: '2023', padi: 4800, jagung: 3200, kedelai: 2200 },
    { name: '2024', padi: 5200, jagung: 3500, kedelai: 2400 },
  ];

  const yieldTrend = [
    { name: 'Jan', yield: 5.2 },
    { name: 'Feb', yield: 5.4 },
    { name: 'Mar', yield: 5.6 },
    { name: 'Apr', yield: 5.8 },
    { name: 'Mei', yield: 6.0 },
    { name: 'Jun', yield: 6.2 },
  ];

  return (
    <DashboardLayout role="dinas" title="Analisis Produksi" subtitle="Tren panen dan komoditas">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Produksi Total 2024</span>
            </div>
            <p className="text-2xl font-bold">12,450 ton</p>
            <p className="text-xs text-emerald-600 mt-1">+8.5% vs tahun lalu</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Rata-rata Hasil</span>
            </div>
            <p className="text-2xl font-bold">5.8 ton/ha</p>
            <p className="text-xs text-emerald-600 mt-1">+3.2% vs tahun lalu</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Luas Panen</span>
            </div>
            <p className="text-2xl font-bold">2,847 ha</p>
            <p className="text-xs text-emerald-600 mt-1">+124 ha vs bulan lalu</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Tren Produksi Tahunan" subtitle="Perbandingan 5 tahun terakhir (ton)">
            <BarChartComponent data={yearlyData} dataKeys={['padi', 'jagung', 'kedelai']} height={300} />
          </ChartCard>
          <ChartCard title="Tren Hasil per Hektar" subtitle="Rata-rata yield (ton/ha)">
            <AreaChartComponent data={yieldTrend} dataKey="yield" color="#3B82F6" height={300} />
          </ChartCard>
        </div>

        <ChartCard title="Produksi Bulanan 2024" subtitle="Perbandingan komoditas (ton)">
          <BarChartComponent data={productionChartData} dataKeys={['padi', 'jagung', 'kedelai']} height={300} />
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
