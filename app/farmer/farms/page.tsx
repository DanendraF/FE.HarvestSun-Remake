'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Farm } from '@/types';
import { cn } from '@/lib/utils';
import { MapPin, Plus, Loader2, Edit2, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { farmService } from '@/lib/api/farmService';
import { useAuth } from '@/lib/auth/AuthContext';
import dynamic from 'next/dynamic';
import { AddFarmForm } from '@/components/forms/AddFarmForm';
import { Skeleton } from '@/components/ui/skeleton';

const InteractiveMap = dynamic(() => import('@/components/dashboard/InteractiveMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-xl border border-border bg-muted flex items-center justify-center animate-pulse">
      <div className="text-muted-foreground flex items-center gap-2">
        <MapPin className="w-5 h-5 animate-bounce" />
        Memuat Peta...
      </div>
    </div>
  )
});

export default function FarmerFarmsPage() {
  const { user } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFarms = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await farmService.getFarms(user.id);
      setFarms(data);
    } catch (error) {
      console.error('Failed to fetch farms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus lahan ini? Semua tanaman dan aktivitas terkait juga akan terhapus.')) {
      try {
        await farmService.deleteFarm(id);
        fetchFarms();
      } catch (error) {
        console.error('Failed to delete farm:', error);
      }
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Nama Lahan',
      render: (row: Farm) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: 'location', header: 'Lokasi' },
    { key: 'crop_type', header: 'Komoditas' },
    {
      key: 'size',
      header: 'Luas (ha)',
      render: (row: Farm) => <span>{row.size} ha</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: Farm) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.status === 'active' && 'bg-emerald-500/10 text-emerald-600',
          row.status === 'harvesting' && 'bg-amber-500/10 text-amber-600',
          row.status === 'inactive' && 'bg-slate-500/10 text-slate-600'
        )}>
          {row.status === 'active' ? 'Aktif' : row.status === 'harvesting' ? 'Panen' : 'Nonaktif'}
        </span>
      ),
    },
    {
      key: 'health_score',
      header: 'Kesehatan',
      render: (row: Farm) => {
        const isHealthy = row.health_score >= 80;
        const isWarning = row.health_score >= 50 && row.health_score < 80;
        const statusText = isHealthy ? 'Sehat' : isWarning ? 'Waspada' : 'Kritis';
        
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', isHealthy ? 'bg-emerald-500' : isWarning ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${row.health_score}%` }} />
                </div>
                <span className="text-xs font-medium">{row.health_score}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Kesehatan: {row.health_score}% ({statusText})</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (row: Farm) => (
        <div className="flex items-center gap-2">
          <AddFarmForm initialData={row} onSuccess={fetchFarms}>
            <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
              <Edit2 className="w-4 h-4" />
            </button>
          </AddFarmForm>
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
    fetchFarms();
  }, [user]);

  return (
    <DashboardLayout role="farmer" title="Lahan Saya" subtitle="Kelola dan pantau semua lahan pertanian">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <AddFarmForm onSuccess={fetchFarms}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Lahan
            </button>
          </AddFarmForm>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <>
            <InteractiveMap farms={farms} />
            <DataTable data={farms} columns={columns} searchable searchKey="name" />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
