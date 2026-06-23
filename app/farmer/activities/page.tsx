'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { Activity, Farm } from '@/types';
import { cn } from '@/lib/utils';
import { Plus, Droplets, Leaf, Wheat, Bug, Eye, Loader2, Edit2, Trash2 } from 'lucide-react';
import { AddActivityForm } from '@/components/forms/AddActivityForm';
import { Skeleton } from '@/components/ui/skeleton';
import { activityService } from '@/lib/api/activityService';
import { farmService } from '@/lib/api/farmService';
import { useAuth } from '@/lib/auth/AuthContext';

const activityIcons: Record<string, React.ElementType> = {
  irrigation: Droplets,
  fertilizing: Leaf,
  harvesting: Wheat,
  pest_control: Bug,
  monitoring: Eye,
};

export default function FarmerActivitiesPage() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userFarms = await farmService.getFarms(user.id);
      setFarms(userFarms);
      
      const allActivities = await activityService.getActivities();
      setActivities(allActivities);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus aktivitas ini?')) {
      try {
        await activityService.deleteActivity(id);
        fetchData();
      } catch (error) {
        console.error('Failed to delete activity:', error);
      }
    }
  };

  const columns = [
    {
      key: 'type',
      header: 'Jenis',
      render: (row: Activity) => {
        let Icon = Eye;
        const lowerType = row.type.toLowerCase();
        if (lowerType.includes('irigasi') || lowerType.includes('siram')) Icon = Droplets;
        else if (lowerType.includes('pupuk') || lowerType.includes('tanam')) Icon = Leaf;
        else if (lowerType.includes('panen')) Icon = Wheat;
        else if (lowerType.includes('hama') || lowerType.includes('penyakit')) Icon = Bug;
        
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="font-medium">{row.type}</span>
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
    {
      key: 'actions',
      header: 'Aksi',
      render: (row: Activity) => (
        <div className="flex items-center gap-2">
          <AddActivityForm farms={farms} initialData={row} onSuccess={fetchData}>
            <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
              <Edit2 className="w-4 h-4" />
            </button>
          </AddActivityForm>
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
    <DashboardLayout role="farmer" title="Aktivitas" subtitle="Log aktivitas pertanian">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <AddActivityForm farms={farms} onSuccess={fetchData}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Aktivitas
            </button>
          </AddActivityForm>
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
          <DataTable data={activities} columns={columns} searchable searchKey="description" />
        )}
      </div>
    </DashboardLayout>
  );
}
