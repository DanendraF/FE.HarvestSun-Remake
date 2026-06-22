'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Sprout, Bug, ClipboardList, Plus } from 'lucide-react';

const cropTypes = [
  { id: '1', name: 'Padi', variety: 'IR64, Ciherang, Mekongga', season: 'Musim Hujan & Kemarau' },
  { id: '2', name: 'Jagung', variety: 'Bisi-2, NK-212, P-27', season: 'Musim Hujan' },
  { id: '3', name: 'Kedelai', variety: 'Anjasmoro, Dering-1', season: 'Musim Kemarau' },
  { id: '4', name: 'Cabai', variety: 'Rawit, Keriting, Besar', season: 'Sepanjang Tahun' },
  { id: '5', name: 'Tomat', variety: 'Ranti, Apel, Mutiara', season: 'Sepanjang Tahun' },
];

const diseases = [
  { id: '1', name: 'Virus Keriting Daun Cabai', symptoms: 'Daun menggulung, pertumbuhan terhambat', severity: 'high' },
  { id: '2', name: 'Busuk Akar Kedelai', symptoms: 'Akar membusuk, daun menguning', severity: 'critical' },
  { id: '3', name: 'Ulat Grayak Jagung', symptoms: 'Lubang pada daun, tongkol rusak', severity: 'medium' },
  { id: '4', name: 'Karat Daun Padi', symptoms: 'Bintik karat pada daun', severity: 'medium' },
];

const activityTypes = [
  { id: '1', name: 'Penyiraman', category: 'Irigasi', icon: 'Droplets' },
  { id: '2', name: 'Pemupukan', category: 'Nutrisi', icon: 'Leaf' },
  { id: '3', name: 'Panen', category: 'Produksi', icon: 'Wheat' },
  { id: '4', name: 'Pengendalian Hama', category: 'Perlindungan', icon: 'Bug' },
  { id: '5', name: 'Pemantauan', category: 'Monitoring', icon: 'Eye' },
];

export default function AdminMasterDataPage() {
  return (
    <DashboardLayout role="admin" title="Master Data" subtitle="Data tanaman, penyakit, dan jenis aktivitas">
      <div className="space-y-6">
        {/* Crops */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold">Jenis Tanaman</h3>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors">
              <Plus className="w-3 h-3" />
              Tambah
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Nama</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Varietas</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Musim</th>
                </tr>
              </thead>
              <tbody>
                {cropTypes.map((crop) => (
                  <tr key={crop.id} className="border-b border-border hover:bg-accent/10 transition-colors">
                    <td className="px-3 py-2 font-medium">{crop.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{crop.variety}</td>
                    <td className="px-3 py-2 text-muted-foreground">{crop.season}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Diseases */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bug className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-semibold">Jenis Penyakit</h3>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors">
              <Plus className="w-3 h-3" />
              Tambah
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Nama</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Gejala</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Severity</th>
                </tr>
              </thead>
              <tbody>
                {diseases.map((disease) => (
                  <tr key={disease.id} className="border-b border-border hover:bg-accent/10 transition-colors">
                    <td className="px-3 py-2 font-medium">{disease.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{disease.symptoms}</td>
                    <td className="px-3 py-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        disease.severity === 'critical' ? 'bg-red-500/10 text-red-600' :
                        disease.severity === 'high' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {disease.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Types */}
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-semibold">Jenis Aktivitas</h3>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-500 text-white text-xs font-medium hover:bg-violet-600 transition-colors">
              <Plus className="w-3 h-3" />
              Tambah
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activityTypes.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-violet-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
