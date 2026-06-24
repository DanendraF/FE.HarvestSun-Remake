'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { activityService } from '@/lib/api/activityService';
import { Activity } from '@/types';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Droplets, Leaf, Wheat, Bug, Activity as ActivityIcon, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Pagination states
  const [regionFilter, setRegionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await activityService.getActivities();
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivities(sorted);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    let result = activities;

    if (regionFilter !== 'all') {
      result = result.filter(act => 
        act.farm?.location?.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter(act => act.type === typeFilter);
    }

    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      if (timeFilter === '7d') cutoff.setDate(now.getDate() - 7);
      else if (timeFilter === '30d') cutoff.setDate(now.getDate() - 30);
      else if (timeFilter === '90d') cutoff.setDate(now.getDate() - 90);

      result = result.filter(act => new Date(act.date) >= cutoff);
    }

    return result;
  }, [activities, regionFilter, typeFilter, timeFilter]);

  const totalPages = Math.ceil(filteredActivities.length / pageSize) || 1;
  const paginatedActivities = filteredActivities.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset page if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [regionFilter, typeFilter, timeFilter]);

  return (
    <DashboardLayout role="officer" title="Monitoring" subtitle="Real-time activity dan filter wilayah">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-border bg-card">
          <Filter className="w-4 h-4 text-muted-foreground mr-1" />
          <select 
            className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">Semua Wilayah</option>
            <option value="Bantul">Bantul</option>
            <option value="Sleman">Sleman</option>
          </select>
          <select 
            className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Semua Aktivitas</option>
            {Object.entries(activityLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select 
            className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">Semua Waktu</option>
            <option value="7d">7 Hari Terakhir</option>
            <option value="30d">30 Hari Terakhir</option>
            <option value="90d">3 Bulan Terakhir</option>
          </select>
        </div>

        {/* Activity Timeline */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <h3 className="text-sm font-semibold mb-4">Timeline Aktivitas</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedActivities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Belum ada aktivitas yang tercatat
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedActivities.map((activity, idx) => {
                const Icon = activityIcons[activity.type] || Eye;
                const isLastInPage = idx === paginatedActivities.length - 1;
                return (
                  <div key={activity.id || idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-500" />
                      </div>
                      {!isLastInPage && <div className="w-px flex-1 bg-border mt-2 min-h-[20px]" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {activityLabels[activity.type] || activity.type}
                          {activity.farm && <span className="text-muted-foreground font-normal ml-1">di {activity.farm.name}</span>}
                        </span>
                        <span className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString('id-ID')}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{activity.description || 'Tidak ada deskripsi'}</p>
                      <div className="flex items-center flex-wrap gap-2 mt-2">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full font-medium',
                          activity.status === 'completed' && 'bg-emerald-500/10 text-emerald-600',
                          activity.status === 'in_progress' && 'bg-blue-500/10 text-blue-600',
                          activity.status === 'scheduled' && 'bg-slate-500/10 text-slate-600'
                        )}>
                          {activity.status === 'completed' ? 'Selesai' : activity.status === 'in_progress' ? 'Berjalan' : 'Terjadwal'}
                        </span>
                        {(typeof activity.cost === 'number' && activity.cost > 0) ? (
                          <span className="text-[10px] text-muted-foreground">Rp. {activity.cost.toLocaleString('id-ID')}</span>
                        ) : null}
                        {activity.farm?.location && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            • {activity.farm.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">
                Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredActivities.length)} dari {filteredActivities.length} data
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-medium">
                  Hal {currentPage} dari {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
