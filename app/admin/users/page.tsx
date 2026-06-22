'use client';

import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DataTable from '@/components/dashboard/DataTable';
import { mockFarmers, mockOfficers } from '@/lib/data/mockData';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { Users, Plus, Shield } from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  created_at: string;
}

const allUsers = [
  ...mockFarmers.map((f, i) => ({ id: f.id, name: f.full_name, email: `farmer${i}@example.com`, role: 'farmer', status: f.status, created_at: '2024-01-15' })),
  ...mockOfficers.map((o, i) => ({ id: o.id, name: o.full_name, email: `officer${i}@example.com`, role: 'officer', status: o.status, created_at: '2024-01-10' })),
  { id: 'admin1', name: 'Admin Utama', email: 'admin@harvestsun.id', role: 'admin', status: 'active', created_at: '2023-12-01' },
  { id: 'dinas1', name: 'Kepala Dinas', email: 'dinas@harvestsun.id', role: 'dinas', status: 'active', created_at: '2024-01-05' },
];

export default function AdminUsersPage() {
  const columns = [
    {
      key: 'name',
      header: 'Nama',
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-600 font-bold text-xs">
            {String(row.name).charAt(0)}
          </div>
          <span className="font-medium">{String(row.name)}</span>
        </div>
      ),
    },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Peran',
      render: (row: any) => {
        const role = String(row.role);
        return (
          <span className={cn(
            'text-xs px-2 py-1 rounded-full font-medium',
            role === 'farmer' && 'bg-emerald-500/10 text-emerald-600',
            role === 'officer' && 'bg-blue-500/10 text-blue-600',
            role === 'dinas' && 'bg-amber-500/10 text-amber-600',
            role === 'admin' && 'bg-violet-500/10 text-violet-600'
          )}>
            {role === 'farmer' ? 'Konsultan Tani' : role === 'officer' ? 'Penyuluh' : role === 'dinas' ? 'Dinas' : 'Admin'}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <span className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          row.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'
        )}>
          {row.status === 'active' ? 'Aktif' : 'Nonaktif'}
        </span>
      ),
    },
    {
      key: 'created_at',
      header: 'Terdaftar',
      render: (row: any) => <span>{new Date(String(row.created_at)).toLocaleDateString('id-ID')}</span>,
    },
  ];

  return (
    <DashboardLayout role="admin" title="User Management" subtitle="CRUD semua pengguna sistem">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-violet-500" />
                <span className="text-xs text-muted-foreground">Total Users</span>
              </div>
              <p className="text-2xl font-bold">{allUsers.length}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500 text-white text-sm font-medium hover:bg-violet-600 transition-colors">
            <Plus className="w-4 h-4" />
            Tambah User
          </button>
        </div>
        <DataTable data={allUsers} columns={columns} searchable searchKey="name" />
      </div>
    </DashboardLayout>
  );
}
