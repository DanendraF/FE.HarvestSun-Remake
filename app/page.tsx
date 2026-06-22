'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Sprout, BarChart3, Brain, Shield, ArrowRight, CheckCircle, Sun, Moon,
  Users, MapPin, Activity, Zap, ChevronDown, Menu, X, Cloud, Droplets, Wind
} from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'Asisten AI cerdas untuk rekomendasi irigasi, pemupukan, dan prediksi panen berbasis data.',
      color: 'bg-emerald-500',
    },
    {
      icon: Activity,
      title: 'Monitoring Real-time',
      description: 'Pantau kesehatan tanaman, cuaca, dan aktivitas pertanian secara langsung dari dashboard.',
      color: 'bg-blue-500',
    },
    {
      icon: BarChart3,
      title: 'Analisis Regional',
      description: 'Dashboard analitik lengkap untuk Dinas Pertanian dengan peta heatmap dan tren produksi.',
      color: 'bg-amber-500',
    },
    {
      icon: Shield,
      title: 'Deteksi Penyakit',
      description: 'Deteksi penyakit tanaman dengan AI melalui upload gambar dan dapatkan rekomendasi pengobatan.',
      color: 'bg-red-500',
    },
    {
      icon: Users,
      title: 'Multi-Role System',
      description: 'Sistem 4 peran: Konsultan Tani, Penyuluh, Dinas Pertanian, dan Administrator.',
      color: 'bg-violet-500',
    },
    {
      icon: Zap,
      title: 'Prediksi Panen',
      description: 'Estimasi hasil panen akurat dengan machine learning berdasarkan data historis dan kondisi lahan.',
      color: 'bg-cyan-500',
    },
  ];

  const roles = [
    {
      title: 'Konsultan Tani',
      description: 'Kelola lahan, pantau tanaman, dan dapatkan rekomendasi AI untuk meningkatkan produktivitas.',
      icon: Sprout,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Manajemen Lahan', 'AI Assistant', 'Deteksi Penyakit', 'Prediksi Panen'],
    },
    {
      title: 'Penyuluh',
      description: 'Monitoring petani, kirim rekomendasi, dan pantau risiko penyakit di wilayah binaan.',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      features: ['Monitoring Petani', 'Disease Alerts', 'AI Copilot', 'Kunjungan Lapangan'],
    },
    {
      title: 'Dinas Pertanian',
      description: 'Analisis regional, peta heatmap, dan intelijen penyakit untuk pengambilan kebijakan.',
      icon: BarChart3,
      color: 'from-amber-500 to-amber-600',
      features: ['Analisis Regional', 'Peta Heatmap', 'Intelijen Penyakit', 'Laporan Kebijakan'],
    },
    {
      title: 'Administrator',
      description: 'Kontrol penuh sistem, manajemen user, master data, dan monitoring infrastruktur.',
      icon: Shield,
      color: 'from-violet-500 to-violet-600',
      features: ['User Management', 'Master Data', 'System Monitoring', 'AI Config'],
    },
  ];

  const stats = [
    { value: '2,847', label: 'Hektare Lahan', icon: MapPin },
    { value: '12,450', label: 'Ton Produksi', icon: BarChart3 },
    { value: '156', label: 'Petani Aktif', icon: Users },
    { value: '89', label: 'Penyuluh', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">HarvestSun</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fitur</a>
              <a href="#roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Peran</a>
              <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Data</a>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => openAuth('login')}
                id="btn-nav-masuk"
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                Masuk
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-3 space-y-2">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent text-sm">Fitur</a>
              <a href="#roles" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent text-sm">Peran</a>
              <a href="#stats" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-accent text-sm">Data</a>
              <button onClick={() => { openAuth('login'); setMobileMenuOpen(false); }} className="block w-full px-3 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium text-center">
                Masuk
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Platform Pertanian Cerdas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Kelola Pertanian dengan{' '}
              <span className="text-emerald-500">AI</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              HarvestSun adalah platform SaaS pertanian yang menggabungkan teknologi AI,
              monitoring real-time, dan analisis regional untuk meningkatkan produktivitas
              dan kualitas hasil pertanian Anda.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openAuth('login')}
                id="btn-hero-mulai"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                Mulai Sekarang
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#features"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border font-medium hover:bg-accent transition-all flex items-center justify-center gap-2"
              >
                Pelajari Fitur
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
            <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-accent/30">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted-foreground">HarvestSun Dashboard</span>
                </div>
              </div>
              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Total Lahan', value: '2,847', icon: MapPin },
                    { label: 'Produksi', value: '12,450 ton', icon: BarChart3 },
                    { label: 'Skor Kesehatan', value: '87%', icon: Activity },
                    { label: 'Penyuluh Aktif', value: '89', icon: Users },
                  ].map((stat, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <stat.icon className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] text-muted-foreground">{stat.label}</span>
                      </div>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-border bg-card">
                    <p className="text-xs font-medium mb-2">Tren Produksi</p>
                    <div className="h-24 flex items-end gap-2">
                      {[40, 55, 45, 70, 60, 75, 65].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-500/20 rounded-t" style={{ height: `${h}%` }}>
                          <div className="w-full bg-emerald-500 rounded-t" style={{ height: `${h * 0.6}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-border bg-card">
                    <p className="text-xs font-medium mb-2">Cuaca Hari Ini</p>
                    <div className="flex items-center gap-4">
                      <Cloud className="w-10 h-10 text-amber-500" />
                      <div>
                        <p className="text-xl font-bold">28°C</p>
                        <p className="text-xs text-muted-foreground">Cerah Berawan</p>
                      </div>
                      <div className="flex gap-3 ml-auto">
                        <div className="text-center">
                          <Droplets className="w-4 h-4 text-blue-500 mx-auto" />
                          <span className="text-[10px]">72%</span>
                        </div>
                        <div className="text-center">
                          <Wind className="w-4 h-4 text-slate-400 mx-auto" />
                          <span className="text-[10px]">12km/h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 border-y border-border bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <stat.icon className="w-5 h-5 text-emerald-500" />
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              HarvestSun menyediakan berbagai fitur canggih untuk membantu seluruh ekosistem pertanian
              dari petani hingga pembuat kebijakan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20 border-t border-border bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">4 Peran dalam Satu Sistem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap peran memiliki dashboard dan fitur yang berbeda, dirancang khusus untuk
              kebutuhan spesifik masing-masing pengguna.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4', role.color)}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{role.description}</p>
                <ul className="space-y-2">
                  {role.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
            <div className="relative p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Meningkatkan Produktivitas Pertanian?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
                Bergabung dengan ribuan petani dan penyuluh yang telah menggunakan HarvestSun
                untuk mengelola pertanian mereka dengan lebih cerdas.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-emerald-600 font-medium hover:bg-emerald-50 transition-colors"
              >
                Mulai Gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">HarvestSun</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart Agriculture Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Fitur</a>
              <a href="#roles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Peran</a>
              <button onClick={() => openAuth('login')} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Masuk</button>
            </div>
          </div>
        </div>
      </footer>
      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}
