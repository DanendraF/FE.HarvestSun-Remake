'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { mockOfficers as initialMockOfficers } from '@/lib/data/mockData';
import { OfficerProfile } from '@/types';
import { cn } from '@/lib/utils';
import { Users, MapPin, TrendingUp, UserCheck, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { REGENCY_DISTRICTS } from '@/lib/data/locations';

export default function DinasOfficerMonitoringPage() {
  const [officers, setOfficers] = useState<OfficerProfile[]>(initialMockOfficers);
  
  // State for assignment modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState<OfficerProfile | null>(null);
  const [regency, setRegency] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);

  // Computed data
  const activeOfficers = officers.filter(o => o.region !== '' && o.region !== null);
  const unassignedOfficers = officers.filter(o => o.region === '' || o.region === null);

  const handleAssignClick = (officer: OfficerProfile) => {
    setSelectedOfficer(officer);
    setRegency('');
    setDistrict('');
    setIsModalOpen(true);
  };

  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOfficer) return;
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const newRegion = `Kec. ${district}, Kab. ${regency}`;
      
      // Update local state
      setOfficers(prev => prev.map(o => {
        if (o.id === selectedOfficer.id) {
          return { ...o, region: newRegion, status: 'active' };
        }
        return o;
      }));

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const performanceColumns = [
    {
      key: 'full_name',
      header: 'Nama',
      render: (row: OfficerProfile) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xs">
            {row.full_name.charAt(0)}
          </div>
          <span className="font-medium">{row.full_name}</span>
        </div>
      ),
    },
    { key: 'region', header: 'Wilayah' },
    { key: 'farmers_count', header: 'Jumlah Petani' },
    { key: 'farms_monitored', header: 'Lahan Dipantau' },
    {
      key: 'performance_score',
      header: 'Skor Kinerja',
      render: (row: OfficerProfile) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 w-16 bg-accent rounded-full overflow-hidden">
            <div className={cn('h-full rounded-full', row.performance_score >= 90 ? 'bg-emerald-500' : row.performance_score >= 80 ? 'bg-amber-500' : 'bg-red-500')} style={{ width: `${row.performance_score}%` }} />
          </div>
          <span className="text-xs font-medium">{row.performance_score}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: OfficerProfile) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'
        )}>
          {row.status === 'active' ? 'Aktif' : 'Nonaktif'}
        </span>
      ),
    },
  ];

  const assignmentColumns = [
    {
      key: 'full_name',
      header: 'Nama Penyuluh',
      render: (row: OfficerProfile) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-600 font-bold text-xs">
            {row.full_name.charAt(0)}
          </div>
          <span className="font-medium">{row.full_name}</span>
        </div>
      ),
    },
    { 
      key: 'status', 
      header: 'Status Saat Ini',
      render: () => (
        <span className="text-xs px-2 py-1 rounded-full font-medium bg-amber-500/10 text-amber-600">
          Menunggu Penempatan
        </span>
      )
    },
    {
      key: 'action',
      header: 'Aksi',
      render: (row: OfficerProfile) => (
        <button
          onClick={() => handleAssignClick(row)}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium rounded-lg transition-colors shadow-sm shadow-emerald-500/20"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Atur Wilayah
        </button>
      ),
    },
  ];

  return (
    <DashboardLayout role="dinas" title="Penyuluh Lapangan" subtitle="Kelola dan pantau kinerja penyuluh di wilayah Anda">
      
      <Tabs defaultValue="kinerja" className="w-full">
        <TabsList className="mb-6 bg-card border border-border">
          <TabsTrigger value="kinerja" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            Kinerja Penyuluh
          </TabsTrigger>
          <TabsTrigger value="penempatan" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white flex items-center gap-2">
            Penempatan Baru
            {unassignedOfficers.length > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {unassignedOfficers.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kinerja" className="space-y-4 outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-muted-foreground">Penyuluh Aktif</span>
              </div>
              <p className="text-2xl font-bold">{activeOfficers.length}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-muted-foreground">Total Petani Dipantau</span>
              </div>
              <p className="text-2xl font-bold">{activeOfficers.reduce((acc, o) => acc + o.farmers_count, 0)}</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Rata-rata Skor</span>
              </div>
              <p className="text-2xl font-bold">
                {activeOfficers.length > 0 
                  ? Math.round(activeOfficers.reduce((acc, o) => acc + o.performance_score, 0) / activeOfficers.length)
                  : 0}%
              </p>
            </div>
          </div>
          <DataTable data={activeOfficers} columns={performanceColumns} searchable searchKey="full_name" />
        </TabsContent>

        <TabsContent value="penempatan" className="space-y-4 outline-none">
          <div className="bg-card border border-border rounded-xl p-6 mb-4">
            <h3 className="font-semibold text-lg mb-2">Penyuluh Menunggu Penempatan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Daftar penyuluh yang baru terdaftar dan belum ditugaskan ke wilayah binaan manapun. Segera atur penempatan agar mereka bisa mulai mendampingi petani.
            </p>
            {unassignedOfficers.length > 0 ? (
              <DataTable data={unassignedOfficers} columns={assignmentColumns} searchable searchKey="full_name" />
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="text-foreground font-medium">Tidak ada antrean penempatan</h4>
                <p className="text-sm text-muted-foreground mt-1">Semua penyuluh sudah memiliki wilayah binaan masing-masing.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Assignment Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Penempatan Wilayah</DialogTitle>
            <DialogDescription>
              Pilih wilayah binaan utama untuk penyuluh <strong>{selectedOfficer?.full_name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAssignSubmit} className="space-y-4 py-4">
            <div>
              <label htmlFor="regency" className="block text-sm font-medium text-foreground mb-1">
                Kabupaten / Kota
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <select
                  id="regency"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none text-sm"
                  value={regency}
                  onChange={(e) => {
                    setRegency(e.target.value);
                    setDistrict('');
                  }}
                >
                  <option value="" disabled>Pilih Kabupaten/Kota</option>
                  {Object.keys(REGENCY_DISTRICTS).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-foreground mb-1">
                Kecamatan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <select
                  id="district"
                  required
                  disabled={!regency}
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none text-sm disabled:opacity-50"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="" disabled>Pilih Kecamatan</option>
                  {regency && REGENCY_DISTRICTS[regency].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Penempatan'
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
