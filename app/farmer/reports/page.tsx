'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FileText, Download, Calendar } from 'lucide-react';

export default function FarmerReportsPage() {
  const reports = [
    { title: 'Laporan Produksi Bulanan', date: 'Maret 2024', type: 'Produksi', size: '2.4 MB' },
    { title: 'Laporan Aktivitas Lahan', date: 'Q1 2024', type: 'Aktivitas', size: '1.8 MB' },
    { title: 'Analisis Kesehatan Tanaman', date: 'Maret 2024', type: 'Analisis', size: '3.1 MB' },
    { title: 'Rekapitulasi Biaya Pertanian', date: 'Q1 2024', type: 'Keuangan', size: '1.2 MB' },
  ];

  return (
    <DashboardLayout role="farmer" title="Laporan" subtitle="Laporan hasil dan aktivitas pertanian">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reports.map((report, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-card hover:border-emerald-500/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-500" />
                </div>
                <button className="p-1.5 rounded-md hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm font-medium mb-1">{report.title}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </span>
                <span>{report.size}</span>
              </div>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-accent font-medium">
                {report.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
