'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { mockDiseaseAlerts } from '@/lib/data/mockData';
import { DiseaseAlert } from '@/types';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react';

export default function OfficerDiseaseAlertsPage() {
  return (
    <DashboardLayout role="officer" title="Alert Penyakit" subtitle="Severity tracking dan tindak lanjut">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl border border-border bg-card">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs">
            <option>Semua Severity</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-xs">
            <option>Semua Status</option>
            <option>Active</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 gap-3">
          {mockDiseaseAlerts.map((alert) => (
            <div
              key={alert.id}
              className={cn(
                'p-4 rounded-xl border transition-all hover:shadow-sm',
                alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' :
                alert.severity === 'high' ? 'border-amber-500/30 bg-amber-500/5' :
                'border-blue-500/30 bg-blue-500/5'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                    alert.severity === 'critical' ? 'bg-red-500/10' :
                    alert.severity === 'high' ? 'bg-amber-500/10' :
                    'bg-blue-500/10'
                  )}>
                    <AlertTriangle className={cn(
                      'w-5 h-5',
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'high' ? 'text-amber-500' :
                      'text-blue-500'
                    )} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{(alert as any).diseaseName || (alert as any).disease_name}</h4>
                      <span className={cn(
                        'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase',
                        alert.severity === 'critical' ? 'bg-red-500 text-white' :
                        alert.severity === 'high' ? 'bg-amber-500 text-white' :
                        'bg-blue-500 text-white'
                      )}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Lahan ID: {(alert as any).farmId || (alert as any).farm_id} · Terdeteksi: {new Date((alert as any).detectedAt || (alert as any).detected_at).toLocaleDateString('id-ID')}
                    </p>
                    {alert.recommendation && (
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-background/50">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{alert.recommendation}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn(
                    'text-xs px-2 py-1 rounded-full font-medium',
                    alert.status === 'active' ? 'bg-red-500/10 text-red-600' : 'bg-emerald-500/10 text-emerald-600'
                  )}>
                    {alert.status === 'active' ? 'Aktif' : 'Terselesaikan'}
                  </span>
                  {alert.status === 'active' && (
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                      Tindak Lanjut
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
