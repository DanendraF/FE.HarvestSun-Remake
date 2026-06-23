import { fetchWithAuth } from './client';
import { CropType, ActivityType } from '@/types';

export const masterDataService = {
  async getCropTypes(): Promise<CropType[]> {
    try {
      const response = await fetchWithAuth('/crop-types');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching crop types:', error);
      throw error;
    }
  },

  async getActivityTypes(): Promise<ActivityType[]> {
    try {
      const response = await fetchWithAuth('/activity-types');
      return response.data || response;
    } catch (error) {
      console.error('Error fetching activity types:', error);
      throw error;
    }
  }
};
