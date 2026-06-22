'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import { ChartCard, BarChartComponent, LineChartComponent, PieChartComponent } from '@/components/dashboard/ChartComponents';
import { dinasKPIs, productionChartData, diseaseTrendData, mockRegionalData } from '@/lib/data/mockData';
import DataTable from '@/components/dashboard/DataTable';
import { RegionalData } from '@/types';
import { cn } from '@/lib/utils';
import { Map, TrendingUp, AlertTriangle, Users } from 'lucide-react';

export default function DinasDashboard() {
  const regionalColumns = [
    { key: 'region', header: 'Kecamatan' },
    { key: 'total_farms', header: 'Jumlah Lahan' },
    { key: 'total_production', header: 'Produksi (ton)', render: (row: RegionalData) => <span>{row.total_production.toLocaleString('id-ID')}</span> },
    { key: 'disease_cases', header: 'Kasus Penyakit' },
    { key: 'active_officers', header: 'Penyuluh Aktif' },
    {
      key: 'avg_yield',
      header: 'Rata-rata Hasil (ton/ha)',
      render: (row: RegionalData) => <span>{row.avg_yield}</span>,
    },
  ];

  const commodityData = [
    { name: 'Padi', value: 4850 },
    { name: 'Jagung', value: 3200 },
    { name: 'Kedelai', value: 2100 },
    { name: 'Cabai', value: 1200 },
    { name: 'Tomat', value: 950 },
  ];

  return (
    <DashboardLayout role="dinas" title="Dashboard" subtitle="Regional KPI dan analisis pertanian">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dinasKPIs.map((kpi, idx) => (
            <KPICard key={idx} data={kpi} index={idx} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Tren Produksi Regional" subtitle="Komoditas utama (ton)">
            <BarChartComponent data={productionChartData} dataKeys={['padi', 'jagung', 'kedelai']} />
          </ChartCard>
          <ChartCard title="Tren Penyakit Regional" subtitle="Kasus baru vs terselesaikan">
            <LineChartComponent data={diseaseTrendData} dataKeys={['cases', 'resolved']} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Map className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-semibold">Data per Kecamatan</h3>
            </div>
            <DataTable data={mockRegionalData} columns={regionalColumns} />
          </div>
          <ChartCard title="Komoditas" subtitle="Distribusi produksi">
            <PieChartComponent data={commodityData} />
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
