'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Shield, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Permission {
  module: string;
  farmer: boolean;
  officer: boolean;
  dinas: boolean;
  admin: boolean;
}

const permissions: Permission[] = [
  { module: 'Dashboard', farmer: true, officer: true, dinas: true, admin: true },
  { module: 'Manajemen Lahan', farmer: true, officer: true, dinas: false, admin: false },
  { module: 'Monitoring Petani', farmer: false, officer: true, dinas: true, admin: true },
  { module: 'Analisis Regional', farmer: false, officer: false, dinas: true, admin: true },
  { module: 'AI Assistant', farmer: true, officer: true, dinas: true, admin: true },
  { module: 'Deteksi Penyakit', farmer: true, officer: true, dinas: false, admin: false },
  { module: 'User Management', farmer: false, officer: false, dinas: false, admin: true },
  { module: 'Master Data', farmer: false, officer: false, dinas: false, admin: true },
  { module: 'System Monitoring', farmer: false, officer: false, dinas: false, admin: true },
  { module: 'Pengaturan Sistem', farmer: false, officer: false, dinas: false, admin: true },
];

export default function AdminRolesPage() {
  return (
    <DashboardLayout role="admin" title="Roles & Permissions" subtitle="Manajemen peran dan hak akses">
      <div className="p-4 rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Modul</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                <span className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Konsultan Tani
                </span>
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                <span className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Penyuluh
                </span>
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                <span className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Dinas
                </span>
              </th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                <span className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  Admin
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-accent/10 transition-colors">
                <td className="px-4 py-3 font-medium">{perm.module}</td>
                <td className="px-4 py-3 text-center">
                  {perm.farmer ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                </td>
                <td className="px-4 py-3 text-center">
                  {perm.officer ? <Check className="w-4 h-4 text-blue-500 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                </td>
                <td className="px-4 py-3 text-center">
                  {perm.dinas ? <Check className="w-4 h-4 text-amber-500 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                </td>
                <td className="px-4 py-3 text-center">
                  {perm.admin ? <Check className="w-4 h-4 text-violet-500 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
