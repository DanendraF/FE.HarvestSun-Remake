import { fetchWithAuth } from './client';
import { Farm } from '@/types';

export const farmService = {
  getFarms: async (userId?: string): Promise<Farm[]> => {
    const url = userId ? `/farms?userId=${userId}` : '/farms';
    return fetchWithAuth(url);
  },

  createFarm: async (farmData: Partial<Farm>): Promise<Farm> => {
    return fetchWithAuth('/farms', {
      method: 'POST',
      body: JSON.stringify(farmData),
    });
  },

  updateFarm: async (id: string, farmData: Partial<Farm>): Promise<Farm> => {
    return fetchWithAuth(`/farms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(farmData),
    });
  },

  deleteFarm: async (id: string): Promise<void> => {
    return fetchWithAuth(`/farms/${id}`, {
      method: 'DELETE',
    });
  },
};
