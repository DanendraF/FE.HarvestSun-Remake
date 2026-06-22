'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FileText, Download, Calendar, BarChart3, Map, Users } from 'lucide-react';

export default function DinasReportsPage() {
  const reports = [
    { title: 'Laporan Produksi Regional', date: 'Maret 2024', type: 'Produksi', size: '5.2 MB' },
    { title: 'Laporan Intelijen Penyakit', date: 'Q1 2024', type: 'Penyakit', size: '3.8 MB' },
    { title: 'Analisis Kinerja Penyuluh', date: 'Maret 2024', type: 'Penyuluh', size: '2.4 MB' },
    { title: 'Peta Heatmap Wilayah', date: 'Q1 2024', type: 'Peta', size: '8.1 MB' },
    { title: 'Rekapitulasi Anggaran', date: 'Q1 2024', type: 'Keuangan', size: '1.9 MB' },
  ];

  return (
    <DashboardLayout role="dinas" title="Laporan" subtitle="Laporan regional dan analisis">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-border bg-card hover:border-amber-500/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-500" />
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
