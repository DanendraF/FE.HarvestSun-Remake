import { FarmerProfile } from '@/types';
import { fetchWithAuth } from './client';
import { mockFarmers } from '../data/mockData';

export const farmerService = {
  // In real backend, this would hit /api/officers/{officerId}/farmers
  // For now, we simulate fetching farmers
  async getFarmersByOfficer(officerId?: string): Promise<FarmerProfile[]> {
    try {
      // Simulation:
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockFarmers;
      
      // Real API:
      // const url = officerId ? `/api/officers/${officerId}/farmers` : '/api/farmers';
      // const response = await fetchWithAuth(url);
      // return response.data;
    } catch (error) {
      console.error('Failed to fetch farmers', error);
      throw error;
    }
  },

  async getFarmerById(id: string): Promise<FarmerProfile | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockFarmers.find(f => f.id === id) || null;
      
      // Real API:
      // const response = await fetchWithAuth(`/api/farmers/${id}`);
      // return response.data;
    } catch (error) {
      console.error(`Failed to fetch farmer ${id}`, error);
      throw error;
    }
  }
};
