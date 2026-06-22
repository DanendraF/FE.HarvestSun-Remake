'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import { ChartCard, BarChartComponent, LineChartComponent } from '@/components/dashboard/ChartComponents';
import { officerKPIs, productionChartData, diseaseTrendData, mockFarmers } from '@/lib/data/mockData';
import DataTable from '@/components/dashboard/DataTable';
import { FarmerProfile } from '@/types';
import { cn } from '@/lib/utils';
import { Users, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

export default function OfficerDashboard() {
  const farmerColumns = [
    {
      key: 'full_name',
      header: 'Nama',
      render: (row: FarmerProfile) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-xs">
            {row.full_name.charAt(0)}
          </div>
          <span className="font-medium">{row.full_name}</span>
        </div>
      ),
    },
    { key: 'location', header: 'Lokasi' },
    { key: 'farm_count', header: 'Jumlah Lahan' },
    { key: 'total_land', header: 'Total Lahan (ha)', render: (row: FarmerProfile) => <span>{row.total_land} ha</span> },
    {
      key: 'performance_score',
      header: 'Skor',
      render: (row: FarmerProfile) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', row.performance_score >= 90 ? 'bg-emerald-500' : row.performance_score >= 75 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${row.performance_score}%` }} />
          </div>
          <span className="text-xs font-medium">{row.performance_score}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: FarmerProfile) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'
        )}>
          {row.status === 'active' ? 'Aktif' : 'Nonaktif'}
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout role="officer" title="Dashboard" subtitle="KPI petani, alert risiko, dan monitoring">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {officerKPIs.map((kpi, idx) => (
            <KPICard key={idx} data={kpi} index={idx} />
          ))}
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-semibold">Alert Risiko Terbaru</h3>
            </div>
            <div className="space-y-3">
              {[
                { farm: 'Lahan Sayur C3', issue: 'Virus Keriting Daun Cabai', severity: 'high', time: '2 jam lalu' },
                { farm: 'Lahan Kedelai E5', issue: 'Busuk Akar Kedelai', severity: 'critical', time: '5 jam lalu' },
                { farm: 'Lahan Jagung B2', issue: 'Ulat Grayak Jagung', severity: 'medium', time: '1 hari lalu' },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/30 transition-all">
                  <div className={cn(
                    'w-2 h-2 rounded-full shrink-0',
                    alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-amber-500' : 'bg-blue-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.issue}</p>
                    <p className="text-xs text-muted-foreground">{alert.farm}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold">Kunjungan Minggu Ini</h3>
            </div>
            <div className="space-y-3">
              {[
                { farmer: 'Budi Santoso', date: '21 Mar', status: 'completed' },
                { farmer: 'Siti Aminah', date: '20 Mar', status: 'completed' },
                { farmer: 'Ahmad Wijaya', date: '19 Mar', status: 'completed' },
                { farmer: 'Dewi Kusuma', date: '18 Mar', status: 'completed' },
              ].map((visit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 text-xs font-bold">
                    {visit.farmer.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{visit.farmer}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{visit.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Tren Produksi Wilayah" subtitle="Komoditas utama (ton)">
            <BarChartComponent data={productionChartData} dataKeys={['padi', 'jagung', 'kedelai']} />
          </ChartCard>
          <ChartCard title="Tren Penyakit" subtitle="Kasus baru vs terselesaikan">
            <LineChartComponent data={diseaseTrendData} dataKeys={['cases', 'resolved']} />
          </ChartCard>
        </div>

        {/* Farmers Table */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Petani Terpantau</h3>
            <button className="text-xs text-blue-500 hover:underline">Lihat Semua</button>
          </div>
          <DataTable data={mockFarmers.slice(0, 4)} columns={farmerColumns} />
        </div>
      </div>
    </DashboardLayout>
  );
}
