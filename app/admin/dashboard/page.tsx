'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import KPICard from '@/components/dashboard/KPICard';
import { ChartCard, AreaChartComponent, BarChartComponent } from '@/components/dashboard/ChartComponents';
import { adminKPIs, mockSystemLogs } from '@/lib/data/mockData';
import { SystemLog } from '@/types';
import { cn } from '@/lib/utils';
import { Server, Activity, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const userGrowthData = [
    { name: 'Jan', users: 120 },
    { name: 'Feb', users: 145 },
    { name: 'Mar', users: 180 },
    { name: 'Apr', users: 220 },
    { name: 'Mei', users: 280 },
    { name: 'Jun', users: 342 },
  ];

  const apiUsageData = [
    { name: 'Sen', requests: 42000 },
    { name: 'Sel', requests: 48000 },
    { name: 'Rab', requests: 45000 },
    { name: 'Kam', requests: 52000 },
    { name: 'Jum', requests: 49000 },
    { name: 'Sab', requests: 38000 },
    { name: 'Min', requests: 35000 },
  ];

  return (
    <DashboardLayout role="admin" title="Dashboard" subtitle="System health, users, dan monitoring">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminKPIs.map((kpi, idx) => (
            <KPICard key={idx} data={kpi} index={idx} />
          ))}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-violet-500" />
              <h3 className="text-sm font-semibold">Status Sistem</h3>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Database', status: 'operational', latency: '12ms' },
                { name: 'API Gateway', status: 'operational', latency: '28ms' },
                { name: 'Auth Service', status: 'operational', latency: '45ms' },
                { name: 'Storage', status: 'degraded', latency: '120ms' },
                { name: 'AI Model', status: 'operational', latency: '350ms' },
              ].map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-accent/30">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      service.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'
                    )} />
                    <span className="text-sm">{service.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{service.latency}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-violet-500" />
              <h3 className="text-sm font-semibold">System Logs</h3>
            </div>
            <div className="space-y-2">
              {mockSystemLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/20 transition-all">
                  <div className={cn(
                    'w-2 h-2 rounded-full shrink-0',
                    log.level === 'error' ? 'bg-red-500' : log.level === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{log.message}</p>
                    <p className="text-[10px] text-muted-foreground">{log.source} · {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Pertumbuhan User" subtitle="Total pengguna terdaftar">
            <AreaChartComponent data={userGrowthData} dataKey="users" color="#8B5CF6" />
          </ChartCard>
          <ChartCard title="API Usage" subtitle="Permintaan API per hari">
            <BarChartComponent data={apiUsageData} dataKeys={['requests']} />
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
