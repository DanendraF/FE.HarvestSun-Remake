'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getSidebarConfig, getRoleLabel, getRoleColor } from '@/lib/data/sidebarConfig';
import { UserRole } from '@/types';
import {
  LayoutDashboard, MapPin, Sprout, ClipboardList, Bot, Scan, TrendingUp,
  FileBarChart, Users, Activity, AlertTriangle, MessageSquare, Map,
  BarChart3, Brain, Shield, Database, Monitor, Settings, ChevronLeft,
  ChevronRight, Menu, X
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, MapPin, Sprout, ClipboardList, Bot, Scan, TrendingUp,
  FileBarChart, Users, Activity, AlertTriangle, MessageSquare, Map,
  BarChart3, Brain, Shield, Database, Monitor, Settings,
};

interface RoleSidebarProps {
  role: UserRole;
  userName?: string;
}

export default function RoleSidebar({ role, userName }: RoleSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sections = getSidebarConfig(role);
  const roleLabel = getRoleLabel(role);
  const roleColor = getRoleColor(role);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const sidebarContent = (
    <div className={cn(
      'flex flex-col h-full bg-card border-r border-border transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-2 overflow-hidden">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', roleColor)}>
            <Sprout className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate">HarvestSun</span>
              <span className="text-[10px] text-muted-foreground truncate">{roleLabel}</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1 rounded-md hover:bg-accent transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 rounded-md hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-4">
            {section.label && !collapsed && (
              <div className="px-3 mb-2">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </span>
              </div>
            )}
            {section.items.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group',
                    active
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className={cn('w-4 h-4 shrink-0', active && 'text-emerald-500')} />
                  {!collapsed && (
                    <span className="truncate flex-1">{item.title}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User */}
      <div className="shrink-0 p-3 border-t border-border">
        <div className={cn(
          'flex items-center gap-2 px-2 py-2 rounded-lg bg-accent/50',
          collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(userName || 'U').charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{userName || 'User'}</span>
              <span className="text-[10px] text-muted-foreground truncate">{roleLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-card border border-border shadow-sm"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside className={cn(
        'lg:hidden fixed left-0 top-0 h-screen z-50 transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </aside>
    </>
  );
}
