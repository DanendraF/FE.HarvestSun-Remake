'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { farmerService } from '@/lib/api/farmerService';
import { FarmerProfile } from '@/types';
import { cn } from '@/lib/utils';
import { Users, Phone, MapPin } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export default function OfficerFarmersPage() {
  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setLoading(true);
        // Assuming the backend handles officer ID from token, 
        // or we pass it if required.
        const data = await farmerService.getFarmersByOfficer();
        setFarmers(data);
      } catch (error) {
        console.error('Failed to load farmers', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const columns = [
    {
      key: 'full_name',
      header: 'Nama',
      render: (row: FarmerProfile) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold text-xs">
            {row.full_name?.charAt(0) || '?'}
          </div>
          <span className="font-medium">{row.full_name || 'Tanpa Nama'}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Telepon',
      render: (row: FarmerProfile) => (
        <span className="flex items-center gap-1 text-muted-foreground">
          <Phone className="w-3 h-3" />
          {row.phone || '-'}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'Lokasi',
      render: (row: FarmerProfile) => (
        <span className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {row.location || '-'}
        </span>
      ),
    },
    { key: 'farm_count', header: 'Jumlah Lahan', render: (row: FarmerProfile) => <span>{row.farm_count || 0}</span> },
    { key: 'total_land', header: 'Total Lahan (ha)', render: (row: FarmerProfile) => <span>{row.total_land || 0} ha</span> },
    {
      key: 'performance_score',
      header: 'Skor Performa',
      render: (row: FarmerProfile) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', (row.performance_score || 0) >= 90 ? 'bg-emerald-500' : (row.performance_score || 0) >= 75 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${row.performance_score || 0}%` }} />
          </div>
          <span className="text-xs font-medium">{row.performance_score || 0}%</span>
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
    <DashboardLayout role="officer" title="Petani Binaan" subtitle="Daftar dan detail performa petani di wilayah Anda">
      <div className="space-y-4">
        {loading ? (
          <div className="flex h-64 items-center justify-center bg-card rounded-xl border border-border">
            <Spinner className="w-8 h-8 text-emerald-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-muted-foreground">Total Petani</span>
                </div>
                <p className="text-2xl font-bold">{farmers.length}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-muted-foreground">Total Lahan</span>
                </div>
                <p className="text-2xl font-bold">
                  {farmers.reduce((acc, f) => acc + (f.total_land || 0), 0).toFixed(1)} ha
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-muted-foreground">Rata-rata Skor</span>
                </div>
                <p className="text-2xl font-bold">
                  {farmers.length > 0 
                    ? Math.round(farmers.reduce((acc, f) => acc + (f.performance_score || 0), 0) / farmers.length) 
                    : 0}%
                </p>
              </div>
            </div>
            <DataTable data={farmers} columns={columns} searchable searchKey="full_name" />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
