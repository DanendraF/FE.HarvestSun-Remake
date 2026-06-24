'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { farmService } from '@/lib/api/farmService';
import { Skeleton } from '@/components/ui/skeleton';
import { Farm } from '@/types';
import { cn } from '@/lib/utils';
import { MapPin, Sprout } from 'lucide-react';

export default function OfficerFarmsPage() {
  const [farms, setFarms] = React.useState<Farm[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);
        // Getting all farms (no userId specified)
        const data = await farmService.getFarms();
        setFarms(data);
      } catch (error) {
        console.error('Failed to fetch farms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);
  const columns = [
    {
      key: 'name',
      header: 'Nama Lahan',
      render: (row: Farm) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-500" />
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: 'location', header: 'Lokasi', render: (row: Farm) => <span>{row.location || '-'}</span> },
    { key: 'cropType', header: 'Komoditas', render: (row: Farm) => <span>{row.cropType || '-'}</span> },
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
      render: (row: Farm) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', (row as any).healthScore >= 90 || (row as any).health_score >= 90 ? 'bg-emerald-500' : (row as any).healthScore >= 75 || (row as any).health_score >= 75 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${(row as any).healthScore || (row as any).health_score}%` }} />
          </div>
          <span className="text-xs font-medium">{(row as any).healthScore || (row as any).health_score}%</span>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout role="officer" title="Lahan" subtitle="Semua lahan terpantau">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Total Lahan</span>
            </div>
            <p className="text-2xl font-bold">{farms.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Luas Total</span>
            </div>
            <p className="text-2xl font-bold">{farms.reduce((acc, f) => acc + f.size, 0).toFixed(1)} ha</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">Rata-rata Kesehatan</span>
            </div>
            <p className="text-2xl font-bold">{farms.length > 0 ? Math.round(farms.reduce((acc, f) => acc + ((f as any).healthScore || (f as any).health_score || 0), 0) / farms.length) : 0}%</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="space-y-2 border rounded-xl p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ) : (
          <DataTable data={farms} columns={columns} searchable searchKey="name" />
        )}
      </div>
    </DashboardLayout>
  );
}
