'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { mockOfficers } from '@/lib/data/mockData';
import { OfficerProfile } from '@/types';
import { cn } from '@/lib/utils';
import { Users, MapPin, TrendingUp } from 'lucide-react';

export default function DinasOfficerMonitoringPage() {
  const columns = [
    {
      key: 'full_name',
      header: 'Nama',
      render: (row: OfficerProfile) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xs">
            {row.full_name.charAt(0)}
          </div>
          <span className="font-medium">{row.full_name}</span>
        </div>
      ),
    },
    { key: 'region', header: 'Wilayah' },
    { key: 'farmers_count', header: 'Jumlah Petani' },
    { key: 'farms_monitored', header: 'Lahan Dipantau' },
    {
      key: 'performance_score',
      header: 'Skor Kinerja',
      render: (row: OfficerProfile) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', row.performance_score >= 90 ? 'bg-emerald-500' : row.performance_score >= 80 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${row.performance_score}%` }} />
          </div>
          <span className="text-xs font-medium">{row.performance_score}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: OfficerProfile) => (
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
    <DashboardLayout role="dinas" title="Kinerja Penyuluh" subtitle="Monitoring kinerja penyuluh lapangan">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Total Penyuluh</span>
            </div>
            <p className="text-2xl font-bold">{mockOfficers.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Total Petani Dipantau</span>
            </div>
            <p className="text-2xl font-bold">{mockOfficers.reduce((acc, o) => acc + o.farmers_count, 0)}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Rata-rata Skor</span>
            </div>
            <p className="text-2xl font-bold">{Math.round(mockOfficers.reduce((acc, o) => acc + o.performance_score, 0) / mockOfficers.length)}%</p>
          </div>
        </div>
        <DataTable data={mockOfficers} columns={columns} searchable searchKey="full_name" />
      </div>
    </DashboardLayout>
  );
}
