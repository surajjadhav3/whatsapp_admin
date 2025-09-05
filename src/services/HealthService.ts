import { API_ENDPOINTS } from '../config/api';
import { axiosInstance } from './axios';

export interface HealthStatus {
  isHealthy: boolean;
  message: string;
  lastChecked: Date;
}

class HealthService {
  async checkHealth(): Promise<HealthStatus> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.HEALTH);
      
      return {
        isHealthy: response.data === 'OK',
        message: response.data === 'OK' ? 'System is operational' : 'System is experiencing issues',
        lastChecked: new Date(),
      };
    } catch (error) {
      return {
        isHealthy: false,
        message: 'Unable to connect to the server',
        lastChecked: new Date(),
      };
    }
  }
}

export const healthService = new HealthService(); 