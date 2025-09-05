import React, { createContext, useContext, ReactNode } from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import HealthCheckPage from '../components/HealthCheckPage';
import { HealthStatus } from '../../../services/HealthService';

interface HealthCheckContextType {
  status: HealthStatus | null;
  loading: boolean;
  checkHealth: () => Promise<void>;
  isHealthy: boolean;
}

const HealthCheckContext = createContext<HealthCheckContextType | undefined>(undefined);

interface HealthCheckProviderProps {
  children: ReactNode;
  pollingInterval?: number;
  showHealthPageOnFailure?: boolean;
}

export const HealthCheckProvider: React.FC<HealthCheckProviderProps> = ({
  children,
  pollingInterval = 30000,
  showHealthPageOnFailure = true,
}) => {
  const healthCheck = useHealthCheck({ pollingInterval });

  if (!healthCheck.loading && !healthCheck.isHealthy && showHealthPageOnFailure) {
    return <HealthCheckPage />;
  }

  return (
    <HealthCheckContext.Provider value={healthCheck}>
      {children}
    </HealthCheckContext.Provider>
  );
};

export const useHealthCheckContext = (): HealthCheckContextType => {
  const context = useContext(HealthCheckContext);
  if (context === undefined) {
    throw new Error('useHealthCheckContext must be used within a HealthCheckProvider');
  }
  return context;
}; 