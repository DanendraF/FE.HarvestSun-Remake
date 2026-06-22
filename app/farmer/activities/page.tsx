'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { mockActivities, mockFarms } from '@/lib/data/mockData';
import { Activity } from '@/types';
import { cn } from '@/lib/utils';
import { Plus, Droplets, Leaf, Wheat, Bug, Eye } from 'lucide-react';
import { AddActivityForm } from '@/components/forms/AddActivityForm';

const activityIcons: Record<string, React.ElementType> = {
  irrigation: Droplets,
  fertilizing: Leaf,
  harvesting: Wheat,
  pest_control: Bug,
  monitoring: Eye,
};

export default function FarmerActivitiesPage() {
  const columns = [
    {
      key: 'type',
      header: 'Jenis',
      render: (row: Activity) => {
        const Icon = activityIcons[row.type] || Eye;
        const labels: Record<string, string> = {
          irrigation: 'Penyiraman',
          fertilizing: 'Pemupukan',
          harvesting: 'Panen',
          pest_control: 'Pengendalian Hama',
          monitoring: 'Pemantauan',
        };
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="font-medium">{labels[row.type] || row.type}</span>
          </div>
        );
      },
    },
    { key: 'description', header: 'Deskripsi' },
    {
      key: 'date',
      header: 'Tanggal',
      render: (row: Activity) => <span>{new Date(row.date).toLocaleDateString('id-ID')}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Activity) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.status === 'completed' && 'bg-emerald-500/10 text-emerald-600',
          row.status === 'in_progress' && 'bg-blue-500/10 text-blue-600',
          row.status === 'scheduled' && 'bg-slate-500/10 text-slate-600'
        )}>
          {row.status === 'completed' ? 'Selesai' : row.status === 'in_progress' ? 'Berjalan' : 'Terjadwal'}
        </span>
      ),
    },
    {
      key: 'cost',
      header: 'Biaya',
      render: (row: Activity) => <span>{row.cost ? `Rp ${row.cost.toLocaleString('id-ID')}` : '-'}</span>,
    },
  ];

  return (
    <DashboardLayout role="farmer" title="Aktivitas" subtitle="Log aktivitas pertanian">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <AddActivityForm farms={mockFarms}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Aktivitas
            </button>
          </AddActivityForm>
        </div>
        <DataTable data={mockActivities} columns={columns} searchable searchKey="description" />
      </div>
    </DashboardLayout>
  );
}
