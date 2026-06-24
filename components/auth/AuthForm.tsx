'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { ROLE_ROUTES } from '@/lib/auth/config';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Loader2, ArrowRight, ChevronsUpDown, Check } from 'lucide-react';
import { UserRole } from '@/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandItem, CommandList } from '@/components/ui/command';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSwitchMode: () => void;
  onSuccess?: () => void;
  isMobile?: boolean;
}

export default function AuthForm({ mode, onSwitchMode, onSuccess, isMobile }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('farmer');
  const [roleOpen, setRoleOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roleOptions: { value: UserRole; label: string }[] = [
    { value: 'farmer',  label: 'Konsultan Tani / Petani' },
    { value: 'officer', label: 'Penyuluh Lapangan' },
    { value: 'dinas',   label: 'Dinas Pertanian' },
    { value: 'admin',   label: 'Administrator' },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error, user } = await signIn(email, password);
    if (error) {
      setError(error.message || 'Email atau password salah.');
    } else if (user) {
      onSuccess?.();
      router.push(ROLE_ROUTES[user.role]);
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error, user } = await signUp(email, password, fullName, role);
    if (error) {
      setError(error.message || 'Gagal mendaftar.');
    } else if (user) {
      onSuccess?.();
      if (user.role === 'farmer') {
        router.push('/onboarding');
      } else {
        router.push(ROLE_ROUTES[user.role]);
      }
    }
    setLoading(false);
  };

  return (
    <div className={`flex flex-col justify-center h-full w-full ${isMobile ? 'px-5 py-4' : 'px-8 py-10'} max-w-sm mx-auto`}>
      {mode === 'login' ? (
        <>
          {/* Login form */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Selamat Datang Kembali!</h1>
            <p className="text-sm text-muted-foreground">Masukkan detail login Anda</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border accent-emerald-500" />
                <span className="text-muted-foreground">Ingat saya</span>
              </label>
              <button type="button" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium text-xs">
                Lupa password?
              </button>
            </div>

            {error && (
              <div className="text-xs px-3 py-2.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              id="btn-login"
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Masuk
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Akun Demo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Demo accounts */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { email: 'farmer@demo.id', label: 'Petani' },
              { email: 'officer@demo.id', label: 'Penyuluh' },
              { email: 'dinas@demo.id', label: 'Dinas' },
              { email: 'admin@demo.id', label: 'Admin' },
            ].map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => { setEmail(acc.email); setPassword('demo'); }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-foreground">{acc.label}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-center text-muted-foreground">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onSwitchMode}
              id="btn-go-register"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Daftar Sekarang
            </button>
          </p>
        </>
      ) : (
        <>
          {/* Register form */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Buat Akun Baru</h1>
            <p className="text-sm text-muted-foreground">Bergabung dan mulai kelola lahan Anda</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
              <input
                id="register-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition-all pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Peran</label>
              <Popover open={roleOpen} onOpenChange={setRoleOpen}>
                <PopoverTrigger asChild>
                  <button
                    id="register-role"
                    type="button"
                    role="combobox"
                    aria-expanded={roleOpen}
                    className={cn(
                      'w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm transition-all',
                      'hover:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500'
                    )}
                  >
                    <span className="text-foreground">
                      {roleOptions.find(o => o.value === role)?.label ?? 'Pilih peran...'}
                    </span>
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0 rounded-xl shadow-lg border border-border"
                  align="start"
                  sideOffset={4}
                >
                  <Command>
                    <CommandList>
                      {roleOptions.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.value}
                          onSelect={() => { setRole(opt.value); setRoleOpen(false); }}
                          className="flex items-center justify-between px-3.5 py-2.5 text-sm cursor-pointer"
                        >
                          {opt.label}
                          <Check
                            className={cn('w-4 h-4 text-emerald-500 transition-opacity', role === opt.value ? 'opacity-100' : 'opacity-0')}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {error && (
              <div className={cn(
                'text-xs px-3 py-2.5 rounded-lg border',
                error.includes('berhasil')
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-600 border-red-500/20'
              )}>
                {error}
              </div>
            )}

            <button
              type="submit"
              id="btn-register"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mt-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Buat Akun
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={onSwitchMode}
              id="btn-go-login"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Masuk
            </button>
          </p>
        </>
      )}
    </div>
  );
}
