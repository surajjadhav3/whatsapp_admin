import { useState, useEffect } from 'react';
import { healthService, HealthStatus } from '../../../services/HealthService';

interface UseHealthCheckOptions {
  pollingInterval?: number;
  onStatusChange?: (status: HealthStatus) => void;
}

export const useHealthCheck = (options: UseHealthCheckOptions = {}) => {
  const { pollingInterval = 30000, onStatusChange } = options;
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const healthStatus = await healthService.checkHealth();
      setStatus(healthStatus);
      
      if (onStatusChange) {
        onStatusChange(healthStatus);
      }
    } catch (error) {
      console.error('Error checking health:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    
    if (pollingInterval > 0) {
      const intervalId = setInterval(checkHealth, pollingInterval);
      return () => clearInterval(intervalId);
    }
  }, [pollingInterval]);

  return {
    status,
    loading,
    checkHealth,
    isHealthy: status?.isHealthy || false,
  };
}; 