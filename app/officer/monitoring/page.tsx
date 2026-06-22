'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockActivities } from '@/lib/data/mockData';
import { Activity } from '@/types';
import { cn } from '@/lib/utils';
import { Eye, Droplets, Leaf, Wheat, Bug, Activity as ActivityIcon, Filter } from 'lucide-react';

const activityIcons: Record<string, React.ElementType> = {
  irrigation: Droplets,
  fertilizing: Leaf,
  harvesting: Wheat,
  pest_control: Bug,
  monitoring: Eye,
};

const activityLabels: Record<string, string> = {
  irrigation: 'Penyiraman',
  fertilizing: 'Pemupukan',
  harvesting: 'Panen',
  pest_control: 'Pengendalian Hama',
  monitoring: 'Pemantauan',
};

export default function OfficerMonitoringPage() {
  return (
    <DashboardLayout role="officer" title="Monitoring" subtitle="Real-time activity dan filter wilayah">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-border bg-card">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs">
            <option>Semua Wilayah</option>
            <option>Kec. Tani Makmur</option>
            <option>Kec. Tani Jaya</option>
          </select>
          <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs">
            <option>Semua Aktivitas</option>
            <option>Penyiraman</option>
            <option>Pemupukan</option>
            <option>Panen</option>
          </select>
          <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs">
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>3 Bulan Terakhir</option>
          </select>
        </div>

        {/* Activity Timeline */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Timeline Aktivitas</h3>
          <div className="space-y-4">
            {mockActivities.map((activity, idx) => {
              const Icon = activityIcons[activity.type] || Eye;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-500" />
                    </div>
                    {idx < mockActivities.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{activityLabels[activity.type] || activity.type}</span>
                      <span className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString('id-ID')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-medium',
                        activity.status === 'completed' && 'bg-emerald-500/10 text-emerald-600',
                        activity.status === 'in_progress' && 'bg-blue-500/10 text-blue-600',
                        activity.status === 'scheduled' && 'bg-slate-500/10 text-slate-600'
                      )}>
                        {activity.status === 'completed' ? 'Selesai' : activity.status === 'in_progress' ? 'Berjalan' : 'Terjadwal'}
                      </span>
                      {activity.cost && (
                        <span className="text-[10px] text-muted-foreground">Rp {activity.cost.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
