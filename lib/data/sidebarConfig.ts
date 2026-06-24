import { SidebarSection, UserRole } from '@/types';

export const farmerSidebar: SidebarSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/farmer/dashboard', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'Manajemen Lahan',
    items: [
      { title: 'Lahan Saya', href: '/farmer/farms', icon: 'MapPin' },
      { title: 'Tanaman Saya', href: '/farmer/crops', icon: 'Sprout' },
      { title: 'Aktivitas', href: '/farmer/activities', icon: 'ClipboardList' },
    ],
  },
  {
    label: 'AI & Analisis',
    items: [
      { title: 'AI Assistant', href: '/farmer/ai-assistant', icon: 'Bot' },
      { title: 'Deteksi Penyakit', href: '/farmer/disease-detection', icon: 'Scan' },
      { title: 'Prediksi Panen', href: '/farmer/harvest-prediction', icon: 'TrendingUp' },
    ],
  },
  {
    label: 'Laporan',
    items: [
      { title: 'Laporan', href: '/farmer/reports', icon: 'FileBarChart' },
    ],
  },
];

export const officerSidebar: SidebarSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/officer/dashboard', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'Pemantauan',
    items: [
      { title: 'Petani', href: '/officer/farmers', icon: 'Users' },
      { title: 'Lahan', href: '/officer/farms', icon: 'MapPin' },
      { title: 'Monitoring', href: '/officer/monitoring', icon: 'Activity' },
    ],
  },
  {
    label: 'Manajemen Risiko',
    items: [
      { title: 'Alert Penyakit', href: '/officer/disease-alerts', icon: 'AlertTriangle', badge: 3 },
      { title: 'Rekomendasi', href: '/officer/recommendations', icon: 'MessageSquare' },
    ],
  },
  {
    label: 'AI & Laporan',
    items: [
      { title: 'AI Copilot', href: '/officer/ai-copilot', icon: 'Bot' },
      { title: 'Laporan', href: '/officer/reports', icon: 'FileBarChart' },
    ],
  },
];

export const dinasSidebar: SidebarSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/dinas/dashboard', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'Analisis Regional',
    items: [
      { title: 'Peta Regional', href: '/dinas/regional-map', icon: 'Map' },
      { title: 'Analisis Produksi', href: '/dinas/production-analytics', icon: 'BarChart3' },
      { title: 'Intelijen Penyakit', href: '/dinas/disease-intelligence', icon: 'Activity' },
    ],
  },
  {
    label: 'Monitoring',
    items: [
      { title: 'Kinerja Penyuluh', href: '/dinas/officer-monitoring', icon: 'Users' },
      { title: 'AI Insights', href: '/dinas/ai-insights', icon: 'Brain' },
    ],
  },
  {
    label: 'Laporan',
    items: [
      { title: 'Laporan', href: '/dinas/reports', icon: 'FileBarChart' },
    ],
  },
];

export const adminSidebar: SidebarSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'Manajemen',
    items: [
      { title: 'Users', href: '/admin/users', icon: 'Users' },
      { title: 'Roles & Permissions', href: '/admin/roles', icon: 'Shield' },
      { title: 'Master Data', href: '/admin/master-data', icon: 'Database' },
    ],
  },
  {
    label: 'Sistem',
    items: [
      { title: 'Monitoring Sistem', href: '/admin/system-monitoring', icon: 'Monitor' },
      { title: 'Laporan', href: '/admin/reports', icon: 'FileBarChart' },
      { title: 'Pengaturan', href: '/admin/settings', icon: 'Settings' },
    ],
  },
];

export function getSidebarConfig(role: UserRole): SidebarSection[] {
  switch (role) {
    case 'farmer': return farmerSidebar;
    case 'officer': return officerSidebar;
    case 'dinas': return dinasSidebar;
    case 'admin': return adminSidebar;
    default: return [];
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'farmer': return 'Petani';
    case 'officer': return 'Penyuluh';
    case 'dinas': return 'Dinas Pertanian';
    case 'admin': return 'Administrator';
    default: return 'User';
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'farmer': return 'bg-emerald-500';
    case 'officer': return 'bg-blue-500';
    case 'dinas': return 'bg-amber-500';
    case 'admin': return 'bg-violet-500';
    default: return 'bg-slate-500';
  }
}
