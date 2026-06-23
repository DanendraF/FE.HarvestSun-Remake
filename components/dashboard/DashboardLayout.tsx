'use client';

import React from 'react';
import RoleSidebar from './RoleSidebar';
import TopNavbar from './TopNavbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ role, children, title, subtitle }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <RoleSidebar role={role} />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300">
          <TopNavbar title={title} subtitle={subtitle} />
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
