export type UserRole = 'farmer' | 'officer' | 'dinas' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface SidebarItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}

export interface KPIData {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value?: number;
  [key: string]: string | number | undefined;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  crop_type: string;
  status: 'active' | 'inactive' | 'harvesting';
  health_score: number;
  created_at: string;
  latitude?: number;
  longitude?: number;
}

export interface Crop {
  id: string;
  farm_id: string;
  name: string;
  variety: string;
  planting_date: string;
  expected_harvest: string;
  growth_stage: string;
  health_status: 'healthy' | 'warning' | 'critical';
  progress: number;
}

export interface Activity {
  id: string;
  farm_id: string;
  type: 'irrigation' | 'fertilizing' | 'harvesting' | 'pest_control' | 'monitoring';
  description: string;
  date: string;
  status: 'completed' | 'scheduled' | 'in_progress';
  cost?: number;
}

export interface DiseaseAlert {
  id: string;
  farm_id: string;
  disease_name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detected_at: string;
  image_url?: string;
  status: 'active' | 'resolved';
  recommendation?: string;
}

export interface FarmerProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  location: string;
  farm_count: number;
  total_land: number;
  performance_score: number;
  status: 'active' | 'inactive';
}

export interface OfficerProfile {
  id: string;
  user_id: string;
  full_name: string;
  region: string;
  farmers_count: number;
  farms_monitored: number;
  performance_score: number;
  status: 'active' | 'inactive';
}

export interface RegionalData {
  region: string;
  total_farms: number;
  total_production: number;
  disease_cases: number;
  active_officers: number;
  avg_yield: number;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  timestamp: string;
}
