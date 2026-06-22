'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockSystemLogs } from '@/lib/data/mockData';
import { SystemLog } from '@/types';
import { cn } from '@/lib/utils';
import { Server, Activity, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';

export default function AdminSystemMonitoringPage() {
  const services = [
    { name: 'Database', status: 'operational', uptime: '99.99%', lastCheck: '2 detik lalu' },
    { name: 'API Gateway', status: 'operational', uptime: '99.95%', lastCheck: '5 detik lalu' },
    { name: 'Auth Service', status: 'operational', uptime: '99.98%', lastCheck: '3 detik lalu' },
    { name: 'Storage', status: 'degraded', uptime: '99.80%', lastCheck: '1 menit lalu' },
    { name: 'AI Model', status: 'operational', uptime: '99.90%', lastCheck: '10 detik lalu' },
    { name: 'Edge Functions', status: 'operational', uptime: '99.92%', lastCheck: '8 detik lalu' },
  ];

  const logColumns = [
    {
      key: 'level',
      header: 'Level',
      render: (row: SystemLog) => (
        <span className={cn(
          'text-xs px-2 py-0.5 rounded-full font-medium',
          row.level === 'error' ? 'bg-red-500/10 text-red-600' :
          row.level === 'warning' ? 'bg-amber-500/10 text-amber-600' :
          'bg-emerald-500/10 text-emerald-600'
        )}>
          {row.level.toUpperCase()}
        </span>
      ),
    },
    { key: 'message', header: 'Pesan' },
    { key: 'source', header: 'Sumber' },
    { key: 'timestamp', header: 'Waktu' },
  ];

  return (
    <DashboardLayout role="admin" title="Monitoring Sistem" subtitle="Logs, API status, dan system health">
      <div className="space-y-6">
        {/* Service Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-card hover:border-violet-500/30 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    service.status === 'operational' ? 'bg-emerald-500' : 'bg-amber-500'
                  )} />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <span className={cn(
                  'text-[10px] px-2 py-0.5 rounded-full font-medium',
                  service.status === 'operational' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                )}>
                  {service.status === 'operational' ? 'Normal' : 'Degraded'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Uptime: {service.uptime}</span>
                <span>{service.lastCheck}</span>
              </div>
            </div>
          ))}
        </div>

        {/* System Logs */}
        <div className="p-4 rounded-xl border border-border bg-card">
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
    </DashboardLayout>
  );
}
