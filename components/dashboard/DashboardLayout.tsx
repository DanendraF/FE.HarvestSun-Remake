'use client';

import React from 'react';
import RoleSidebar from './RoleSidebar';
import TopNavbar from './TopNavbar';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ role, children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <RoleSidebar role={role} />
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <TopNavbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
