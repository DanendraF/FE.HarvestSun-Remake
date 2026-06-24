import { FarmerProfile } from '@/types';
import { fetchWithAuth } from './client';
import { mockFarmers } from '../data/mockData';

export const farmerService = {
  // In real backend, this would hit /api/officers/{officerId}/farmers
  // For now, we simulate fetching farmers
  async getFarmersByOfficer(officerId?: string): Promise<FarmerProfile[]> {
    try {
      const url = officerId ? `/farmer-profiles?officerId=${officerId}` : '/farmer-profiles';
      const data = await fetchWithAuth(url);
      
      // The backend returns an array of farmer profiles containing { id, userId, phone, location, performanceScore, status, user: { fullName } }.
      // We map this to the frontend FarmerProfile type:
      return data.map((profile: any) => ({
        id: profile.id,
        user_id: profile.userId,
        full_name: profile.user?.full_name || profile.user?.fullName || 'Tanpa Nama',
        phone: profile.phone,
        location: profile.location,
        farm_count: profile.user?.farms?.length || 0, // Fallback if backend doesn't return
        total_land: profile.user?.farms?.reduce((acc: number, f: any) => acc + (f.size || 0), 0) || 0,
        performance_score: profile.performanceScore || profile.performance_score,
        status: profile.status,
      }));
    } catch (error) {
      console.error('Failed to fetch farmers', error);
      throw error;
    }
  },

  async getFarmerById(id: string): Promise<FarmerProfile | null> {
    try {
      const profile = await fetchWithAuth(`/farmer-profiles/${id}`);
      
      return {
        id: profile.id,
        user_id: profile.userId,
        full_name: profile.user?.full_name || profile.user?.fullName || 'Tanpa Nama',
        phone: profile.phone,
        location: profile.location,
        farm_count: profile.user?.farms?.length || 0,
        total_land: profile.user?.farms?.reduce((acc: number, f: any) => acc + (f.size || 0), 0) || 0,
        performance_score: profile.performanceScore || profile.performance_score,
        status: profile.status,
      };
    } catch (error) {
      console.error(`Failed to fetch farmer ${id}`, error);
      throw error;
    }
  }
};
