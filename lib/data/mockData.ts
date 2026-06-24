import { KPIData, Farm, Crop, Activity, DiseaseAlert, FarmerProfile, OfficerProfile, RegionalData, ChartDataPoint, SystemLog } from '@/types';

export const farmerKPIs: KPIData[] = [
  { label: 'Total Lahan', value: 12, change: 2, changeLabel: 'bulan ini', icon: 'MapPin', trend: 'up' },
  { label: 'Tanaman Aktif', value: 48, change: 5, changeLabel: 'bulan ini', icon: 'Sprout', trend: 'up' },
  { label: 'Skor Kesehatan', value: '87%', change: 3, changeLabel: 'vs bulan lalu', icon: 'Heart', trend: 'up' },
  { label: 'Estimasi Panen', value: '24 ton', change: -2, changeLabel: 'vs target', icon: 'Wheat', trend: 'down' },
];

export const officerKPIs: KPIData[] = [
  { label: 'Petani Terpantau', value: 156, change: 12, changeLabel: 'bulan ini', icon: 'Users', trend: 'up' },
  { label: 'Lahan Aktif', value: 423, change: 18, changeLabel: 'bulan ini', icon: 'MapPin', trend: 'up' },
  { label: 'Alert Risiko', value: 8, change: -3, changeLabel: 'vs minggu lalu', icon: 'AlertTriangle', trend: 'up' },
  { label: 'Kunjungan', value: 42, change: 5, changeLabel: 'minggu ini', icon: 'ClipboardCheck', trend: 'up' },
];

export const dinasKPIs: KPIData[] = [
  { label: 'Total Lahan Regional', value: '2,847', change: 124, changeLabel: 'bulan ini', icon: 'Map', trend: 'up' },
  { label: 'Produksi Total', value: '12,450 ton', change: 8.5, changeLabel: 'vs tahun lalu', icon: 'BarChart3', trend: 'up' },
  { label: 'Kasus Penyakit', value: 34, change: -12, changeLabel: 'vs bulan lalu', icon: 'Activity', trend: 'up' },
  { label: 'Penyuluh Aktif', value: 89, change: 5, changeLabel: 'bulan ini', icon: 'Users', trend: 'up' },
];

export const adminKPIs: KPIData[] = [
  { label: 'Total Users', value: 1, change: 0, changeLabel: 'bulan ini', icon: 'Users', trend: 'neutral' },
  { label: 'System Uptime', value: '99.9%', change: 0, changeLabel: '30 hari', icon: 'Server', trend: 'up' },
  { label: 'API Requests', value: '2.4M', change: 12, changeLabel: 'vs bulan lalu', icon: 'Zap', trend: 'up' },
  { label: 'Active Sessions', value: 342, change: 28, changeLabel: 'real-time', icon: 'Activity', trend: 'up' },
];

export const mockFarms: Farm[] = [
  { id: '1', name: 'Lahan Padi A1', location: 'Sleman, DI Yogyakarta', size: 2.5, cropType: 'Padi', status: 'active', healthScore: 92, created_at: '2024-01-15', latitude: -7.7450, longitude: 110.3600 },
  { id: '2', name: 'Lahan Jagung B2', location: 'Bantul, DI Yogyakarta', size: 1.8, cropType: 'Jagung', status: 'active', healthScore: 85, created_at: '2024-02-20', latitude: -7.8800, longitude: 110.3350 },
  { id: '3', name: 'Lahan Sayur C3', location: 'Gunung Kidul, DI Yogyakarta', size: 0.5, cropType: 'Cabai', status: 'harvesting', healthScore: 78, created_at: '2024-03-10', latitude: -7.9800, longitude: 110.5880 },
  { id: '4', name: 'Lahan Padi D4', location: 'Kulon Progo, DI Yogyakarta', size: 3.0, cropType: 'Padi', status: 'active', healthScore: 95, created_at: '2024-01-20', latitude: -7.8450, longitude: 110.1520 },
  { id: '5', name: 'Lahan Kedelai E5', location: 'Kota Yogyakarta', size: 1.2, cropType: 'Kedelai', status: 'inactive', healthScore: 60, created_at: '2024-04-05', latitude: -7.7950, longitude: 110.3695 },
];

export const mockCrops: Crop[] = [
  { id: '1', farmId: '1', name: 'Padi IR64', variety: 'IR64', plantingDate: '2024-01-15', expectedHarvest: '2024-04-20', growthStage: 'Vegetatif', healthStatus: 'healthy', progress: 65 },
  { id: '2', farmId: '2', name: 'Jagung Hibrida Bisi-2', variety: 'Bisi-2', plantingDate: '2024-02-20', expectedHarvest: '2024-05-25', growthStage: 'Generatif', healthStatus: 'healthy', progress: 78 },
  { id: '3', farmId: '3', name: 'Cabai Rawit', variety: 'Lokal', plantingDate: '2024-03-10', expectedHarvest: '2024-06-15', growthStage: 'Pematangan', healthStatus: 'warning', progress: 90 },
  { id: '4', farmId: '4', name: 'Padi Ciherang', variety: 'Ciherang', plantingDate: '2024-01-20', expectedHarvest: '2024-04-25', growthStage: 'Vegetatif', healthStatus: 'healthy', progress: 70 },
  { id: '5', farmId: '5', name: 'Kedelai Anjasmoro', variety: 'Anjasmoro', plantingDate: '2024-04-05', expectedHarvest: '2024-07-10', growthStage: 'Pertumbuhan', healthStatus: 'critical', progress: 25 },
];

export const mockActivities: Activity[] = [
  { id: '1', farmId: '1', type: 'irrigation', description: 'Penyiraman rutin pagi', date: '2024-03-20', status: 'completed', cost: 0 },
  { id: '2', farmId: '1', type: 'fertilizing', description: 'Pemupukan NPK fase vegetatif', date: '2024-03-18', status: 'completed', cost: 250000 },
  { id: '3', farmId: '2', type: 'monitoring', description: 'Pemantauan pertumbuhan jagung', date: '2024-03-21', status: 'in_progress', cost: 0 },
  { id: '4', farmId: '3', type: 'pest_control', description: 'Penyemprotan pestisida organik', date: '2024-03-19', status: 'completed', cost: 180000 },
  { id: '5', farmId: '4', type: 'irrigation', description: 'Penyiraman sore', date: '2024-03-21', status: 'scheduled', cost: 0 },
];

export const mockDiseaseAlerts: DiseaseAlert[] = [
  { id: '1', farmId: '3', diseaseName: 'Virus Keriting Daun Cabai', severity: 'high', detectedAt: '2024-03-18', status: 'active', recommendation: 'Lakukan pemangkasan daun terinfeksi dan semprot insektisida' },
  { id: '2', farmId: '5', diseaseName: 'Busuk Akar Kedelai', severity: 'critical', detectedAt: '2024-03-15', status: 'active', recommendation: 'Perbaiki drainase dan aplikasikan fungisida' },
  { id: '3', farmId: '2', diseaseName: 'Ulat Grayak Jagung', severity: 'medium', detectedAt: '2024-03-10', status: 'resolved', recommendation: 'Pantau populasi ulat dan terapkan pengendalian hayati' },
];

export const mockFarmers: FarmerProfile[] = [
  { id: '1', user_id: 'u1', full_name: 'Budi Santoso', phone: '081234567890', location: 'Desa Suka Maju', farm_count: 3, total_land: 6.5, performance_score: 92, status: 'active' },
  { id: '2', user_id: 'u2', full_name: 'Siti Aminah', phone: '081234567891', location: 'Desa Harapan', farm_count: 2, total_land: 3.2, performance_score: 88, status: 'active' },
  { id: '3', user_id: 'u3', full_name: 'Ahmad Wijaya', phone: '081234567892', location: 'Desa Sejahtera', farm_count: 4, total_land: 8.0, performance_score: 75, status: 'active' },
  { id: '4', user_id: 'u4', full_name: 'Dewi Kusuma', phone: '081234567893', location: 'Desa Makmur', farm_count: 1, total_land: 2.0, performance_score: 95, status: 'active' },
  { id: '5', user_id: 'u5', full_name: 'Eko Prasetyo', phone: '081234567894', location: 'Desa Baru', farm_count: 2, total_land: 3.5, performance_score: 60, status: 'inactive' },
];

export const mockOfficers: OfficerProfile[] = [
  { id: '1', user_id: 'o1', full_name: 'Dr. Rina Susanti', region: 'Kec. Tani Makmur', farmers_count: 45, farms_monitored: 120, performance_score: 94, status: 'active' },
  { id: '2', user_id: 'o2', full_name: 'Ir. Bambang Hartono', region: 'Kec. Tani Jaya', farmers_count: 38, farms_monitored: 95, performance_score: 89, status: 'active' },
  { id: '3', user_id: 'o3', full_name: 'MSc. Andi Wijaya', region: 'Kec. Tani Baru', farmers_count: 52, farms_monitored: 145, performance_score: 91, status: 'active' },
  { id: '4', user_id: 'o4', full_name: 'Dr. Sari Dewi', region: 'Kec. Tani Sejahtera', farmers_count: 21, farms_monitored: 63, performance_score: 87, status: 'active' },
];

export const mockRegionalData: RegionalData[] = [
  { region: 'Kec. Tani Makmur', total_farms: 420, total_production: 4850, disease_cases: 8, active_officers: 4, avg_yield: 6.2 },
  { region: 'Kec. Tani Jaya', total_farms: 380, total_production: 4120, disease_cases: 12, active_officers: 3, avg_yield: 5.8 },
  { region: 'Kec. Tani Baru', total_farms: 290, total_production: 3100, disease_cases: 6, active_officers: 3, avg_yield: 5.5 },
  { region: 'Kec. Tani Sejahtera', total_farms: 210, total_production: 2450, disease_cases: 4, active_officers: 2, avg_yield: 6.0 },
  { region: 'Kec. Tani Harapan', total_farms: 180, total_production: 1980, disease_cases: 3, active_officers: 2, avg_yield: 5.9 },
];

export const productionChartData: ChartDataPoint[] = [
  { name: 'Jan', padi: 420, jagung: 280, kedelai: 150 },
  { name: 'Feb', padi: 380, jagung: 320, kedelai: 180 },
  { name: 'Mar', padi: 450, jagung: 290, kedelai: 200 },
  { name: 'Apr', padi: 520, jagung: 350, kedelai: 220 },
  { name: 'Mei', padi: 480, jagung: 380, kedelai: 190 },
  { name: 'Jun', padi: 510, jagung: 400, kedelai: 240 },
];

export const diseaseTrendData: ChartDataPoint[] = [
  { name: 'Minggu 1', cases: 12, resolved: 8 },
  { name: 'Minggu 2', cases: 18, resolved: 14 },
  { name: 'Minggu 3', cases: 15, resolved: 16 },
  { name: 'Minggu 4', cases: 22, resolved: 18 },
  { name: 'Minggu 5', cases: 28, resolved: 24 },
  { name: 'Minggu 6', cases: 20, resolved: 26 },
];

export const harvestPredictionData: ChartDataPoint[] = [
  { name: 'Padi', actual: 420, predicted: 450 },
  { name: 'Jagung', actual: 280, predicted: 310 },
  { name: 'Kedelai', actual: 150, predicted: 180 },
  { name: 'Cabai', actual: 85, predicted: 95 },
  { name: 'Tomat', actual: 120, predicted: 135 },
];

export const mockSystemLogs: SystemLog[] = [
  { id: '1', level: 'info', message: 'User login successful: budi@example.com', source: 'auth', timestamp: '2024-03-21 08:23:15' },
  { id: '2', level: 'warning', message: 'API rate limit approaching for edge function', source: 'api', timestamp: '2024-03-21 08:15:42' },
  { id: '3', level: 'error', message: 'Failed to process image upload: timeout', source: 'storage', timestamp: '2024-03-21 07:58:30' },
  { id: '4', level: 'info', message: 'Database backup completed successfully', source: 'database', timestamp: '2024-03-21 07:00:00' },
  { id: '5', level: 'warning', message: 'High memory usage detected on worker-3', source: 'system', timestamp: '2024-03-21 06:45:12' },
];

export const weatherData = {
  location: 'Desa Suka Maju',
  temperature: 28,
  condition: 'Cerah Berawan',
  humidity: 72,
  windSpeed: 12,
  forecast: [
    { day: 'Sen', temp: 29, condition: 'Cerah' },
    { day: 'Sel', temp: 30, condition: 'Cerah' },
    { day: 'Rab', temp: 28, condition: 'Hujan Ringan' },
    { day: 'Kam', temp: 27, condition: 'Hujan' },
    { day: 'Jum', temp: 29, condition: 'Cerah Berawan' },
  ],
};

export const aiInsights = [
  { id: '1', title: 'Rekomendasi Irigasi', content: 'Berdasarkan cuaca dan kelembaban tanah, disarankan untuk mengurangi frekuensi penyiraman menjadi 2x seminggu untuk lahan padi A1.', confidence: 92, type: 'recommendation' },
  { id: '2', title: 'Prediksi Hama', content: 'Risiko serangan wereng coklat meningkat 35% dalam 2 minggu ke depan. Lakukan pemantauan intensif.', confidence: 87, type: 'warning' },
  { id: '3', title: 'Optimalisasi Pupuk', content: 'Tanaman jagung B2 memerlukan tambahan K2O 50 kg/ha pada fase generatif saat ini.', confidence: 95, type: 'recommendation' },
];
