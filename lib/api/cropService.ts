import { fetchWithAuth } from './client';
import { Crop } from '@/types';

export const cropService = {
  getCrops: async (farmId?: string): Promise<Crop[]> => {
    const url = farmId ? `/crops?farmId=${farmId}` : '/crops';
    return fetchWithAuth(url);
  },

  createCrop: async (cropData: Partial<Crop>): Promise<Crop> => {
    return fetchWithAuth('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData),
    });
  },

  updateCrop: async (id: string, cropData: Partial<Crop>): Promise<Crop> => {
    return fetchWithAuth(`/crops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cropData),
    });
  },

  deleteCrop: async (id: string): Promise<void> => {
    return fetchWithAuth(`/crops/${id}`, {
      method: 'DELETE',
    });
  },
};
