import api from './client';
import { CropType, ActivityType } from '@/types';

export const masterDataService = {
  async getCropTypes(): Promise<CropType[]> {
    try {
      const response = await api.get('/crop-types');
      return response.data;
    } catch (error) {
      console.error('Error fetching crop types:', error);
      throw error;
    }
  },

  async getActivityTypes(): Promise<ActivityType[]> {
    try {
      const response = await api.get('/activity-types');
      return response.data;
    } catch (error) {
      console.error('Error fetching activity types:', error);
      throw error;
    }
  }
};
