'use client';

import React from 'react';
import RoleSidebar from './RoleSidebar';
import TopNavbar from './TopNavbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserRole } from '@/types';
import { useAuth } from '@/lib/auth/AuthContext';

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ role, children, title, subtitle }: DashboardLayoutProps) {
  const { user } = useAuth();
  
  return (
    <SidebarProvider>
      <RoleSidebar role={role} userName={user?.full_name || (user as any)?.fullName} />
      <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300">
        <TopNavbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
