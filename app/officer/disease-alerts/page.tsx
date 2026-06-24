'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { diseaseAlertService } from '@/lib/api/diseaseAlertService';
import { DiseaseAlert } from '@/types';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, Clock, Filter, Plus, Edit2, Trash2 } from 'lucide-react';
import { AddDiseaseAlertForm } from '@/components/forms/AddDiseaseAlertForm';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function OfficerDiseaseAlertsPage() {
  const [alerts, setAlerts] = React.useState<DiseaseAlert[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await diseaseAlertService.getDiseaseAlerts();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAlerts();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await diseaseAlertService.updateDiseaseAlert(id, { status: 'resolved' });
      toast.success('Status peringatan berhasil diubah menjadi selesai.');
      fetchAlerts();
    } catch (error) {
      console.error('Failed to resolve alert:', error);
      toast.error('Gagal mengubah status peringatan.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus peringatan ini?')) {
      try {
        await diseaseAlertService.deleteDiseaseAlert(id);
        toast.success('Peringatan berhasil dihapus.');
        fetchAlerts();
      } catch (error) {
        console.error('Failed to delete alert:', error);
        toast.error('Gagal menghapus peringatan.');
      }
    }
  };

  return (
    <DashboardLayout role="officer" title="Alert Penyakit" subtitle="Severity tracking dan tindak lanjut">
      <div className="space-y-4">
        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2">
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
          <AddDiseaseAlertForm onSuccess={fetchAlerts}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
              <Plus className="w-4 h-4" />
              Tambah Peringatan
            </button>
          </AddDiseaseAlertForm>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 gap-3">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ) : alerts.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground border rounded-xl border-dashed">
              Tidak ada peringatan penyakit yang ditemukan.
            </div>
          ) : (
            alerts.map((alert) => (
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
                    <div className="flex items-center gap-2 mb-1">
                      <AddDiseaseAlertForm initialData={alert} onSuccess={fetchAlerts}>
                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </AddDiseaseAlertForm>
                      <button 
                        onClick={() => handleDelete(alert.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded-full font-medium',
                      alert.status === 'active' ? 'bg-red-500/10 text-red-600' : 'bg-emerald-500/10 text-emerald-600'
                    )}>
                      {alert.status === 'active' ? 'Aktif' : 'Terselesaikan'}
                    </span>
                    {alert.status === 'active' && (
                      <button 
                        onClick={() => handleResolve(alert.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                      >
                        Tindak Lanjut
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
