'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Search, Bell, LogOut, User, Sun, Moon, ChevronDown
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface TopNavbarProps {
  title?: string;
  subtitle?: string;
}

export default function TopNavbar({ title, subtitle }: TopNavbarProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 lg:px-6">
        {/* Left: Title */}
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            {title && <h1 className="text-base font-semibold">{title}</h1>}
            {subtitle && <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className={cn(
            'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200',
            searchFocused ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border bg-accent/50'
          )}>
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-56 placeholder:text-muted-foreground"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  {(user?.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden sm:block">{user?.full_name || 'User'}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <User className="w-4 h-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
