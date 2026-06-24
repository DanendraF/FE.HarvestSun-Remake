import { fetchWithAuth } from './client';
import { DiseaseAlert } from '@/types';

export const diseaseAlertService = {
  getDiseaseAlerts: async (farmId?: string): Promise<DiseaseAlert[]> => {
    const url = farmId ? `/disease-alerts?farmId=${farmId}` : '/disease-alerts';
    return fetchWithAuth(url);
  },

  getDiseaseAlertById: async (id: string): Promise<DiseaseAlert> => {
    return fetchWithAuth(`/disease-alerts/${id}`);
  },

  createDiseaseAlert: async (data: Partial<DiseaseAlert>): Promise<DiseaseAlert> => {
    return fetchWithAuth('/disease-alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateDiseaseAlert: async (id: string, data: Partial<DiseaseAlert>): Promise<DiseaseAlert> => {
    return fetchWithAuth(`/disease-alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteDiseaseAlert: async (id: string): Promise<void> => {
    return fetchWithAuth(`/disease-alerts/${id}`, {
      method: 'DELETE',
    });
  },
};
