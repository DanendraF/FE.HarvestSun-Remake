'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { mockCrops, mockFarms } from '@/lib/data/mockData';
import { Crop } from '@/types';
import { cn } from '@/lib/utils';
import { Sprout, Plus } from 'lucide-react';
import { AddCropForm } from '@/components/forms/AddCropForm';

export default function FarmerCropsPage() {
  const columns = [
    {
      key: 'name',
      header: 'Tanaman',
      render: (row: Crop) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <span className="font-medium">{row.name}</span>
            <p className="text-[10px] text-muted-foreground">{row.variety}</p>
          </div>
        </div>
      ),
    },
    { key: 'growth_stage', header: 'Fase' },
    {
      key: 'planting_date',
      header: 'Tanggal Tanam',
      render: (row: Crop) => <span>{new Date(row.planting_date).toLocaleDateString('id-ID')}</span>,
    },
    {
      key: 'expected_harvest',
      header: 'Est. Panen',
      render: (row: Crop) => <span>{new Date(row.expected_harvest).toLocaleDateString('id-ID')}</span>,
    },
    {
      key: 'health_status',
      header: 'Kesehatan',
      render: (row: Crop) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.health_status === 'healthy' && 'bg-emerald-500/10 text-emerald-600',
          row.health_status === 'warning' && 'bg-amber-500/10 text-amber-600',
          row.health_status === 'critical' && 'bg-red-500/10 text-red-600'
        )}>
          {row.health_status === 'healthy' ? 'Sehat' : row.health_status === 'warning' ? 'Waspada' : 'Kritis'}
        </span>
      ),
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (row: Crop) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full bg-emerald-500')} style={{ width: `${row.progress}%` }} />
          </div>
          <span className="text-xs font-medium">{row.progress}%</span>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="farmer" title="Tanaman Saya" subtitle="Pantau pertumbuhan dan status tanaman">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <AddCropForm farms={mockFarms}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Tanaman
            </button>
          </AddCropForm>
        </div>
        <DataTable data={mockCrops} columns={columns} searchable searchKey="name" />
      </div>
    </DashboardLayout>
  );
}
