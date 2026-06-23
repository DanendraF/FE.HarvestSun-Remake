'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Crop, Farm } from '@/types';
import { cn } from '@/lib/utils';
import { Sprout, Plus, Loader2, Edit2, Trash2 } from 'lucide-react';
import { AddCropForm } from '@/components/forms/AddCropForm';
import { Skeleton } from '@/components/ui/skeleton';
import { cropService } from '@/lib/api/cropService';
import { farmService } from '@/lib/api/farmService';
import { useAuth } from '@/lib/auth/AuthContext';

export default function FarmerCropsPage() {
  const { user } = useAuth();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userFarms = await farmService.getFarms(user.id);
      setFarms(userFarms);
      const allCrops = await cropService.getCrops();
      setCrops(allCrops);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus tanaman ini?')) {
      try {
        await cropService.deleteCrop(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete crop:', error);
      }
    }
  };

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
    {
      key: 'actions',
      header: 'Aksi',
      render: (row: Crop) => (
        <div className="flex items-center gap-2">
          <AddCropForm farms={farms} initialData={row} onSuccess={fetchData}>
            <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
              <Edit2 className="w-4 h-4" />
            </button>
          </AddCropForm>
          <button 
            onClick={() => handleDelete(row.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
            title="Hapus"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <DashboardLayout role="farmer" title="Tanaman Saya" subtitle="Pantau pertumbuhan dan status tanaman">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <AddCropForm farms={farms} onSuccess={fetchData}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Tanaman
            </button>
          </AddCropForm>
        </div>
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-64" />
            </div>
            <div className="space-y-2 border rounded-xl p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <DataTable data={crops} columns={columns} searchable searchKey="name" />
        )}
      </div>
    </DashboardLayout>
  );
}
