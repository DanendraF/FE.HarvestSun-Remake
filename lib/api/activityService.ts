import { fetchWithAuth } from './client';
import { Activity } from '@/types';

export const activityService = {
  getActivities: async (farmId?: string): Promise<Activity[]> => {
    const url = farmId ? `/activities?farmId=${farmId}` : '/activities';
    return fetchWithAuth(url);
  },

  createActivity: async (activityData: Partial<Activity>): Promise<Activity> => {
    return fetchWithAuth('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  },

  updateActivity: async (id: string, activityData: Partial<Activity>): Promise<Activity> => {
    return fetchWithAuth(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activityData),
    });
  },

  deleteActivity: async (id: string): Promise<void> => {
    return fetchWithAuth(`/activities/${id}`, {
      method: 'DELETE',
    });
  },
};
