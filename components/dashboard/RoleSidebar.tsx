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

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

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
  const sections = getSidebarConfig(role);
  const roleLabel = getRoleLabel(role);
  const roleColor = getRoleColor(role);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-border h-14 flex items-center justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/${role}/dashboard`} className="flex items-center gap-2">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', roleColor)}>
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-semibold truncate">HarvestSun</span>
                  <span className="text-[10px] text-muted-foreground truncate">{roleLabel}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section, sIdx) => (
          <SidebarGroup key={sIdx}>
            {section.label && <SidebarGroupLabel>{section.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {section.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard;
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Link href={item.href} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {(userName || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0 flex-1 ml-2">
                <span className="text-sm font-medium truncate">{userName || 'User'}</span>
                <span className="text-[10px] text-muted-foreground truncate">{roleLabel}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
