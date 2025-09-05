import { useState, useEffect, useCallback } from 'react';
import { 
  fetchOverviewData, 
  fetchExpiringPlans, 
  fetchBatchSummary,
  sendExpiryReminders
} from '../api/dashboardApi';
import { OverviewData, ExpiringPlan, BatchSummary } from '../types';

export const useDashboardData = (days: number = 7) => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [expiringPlans, setExpiringPlans] = useState<ExpiringPlan[]>([]);
  const [batchSummary, setBatchSummary] = useState<BatchSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch overview data
      const overview = await fetchOverviewData();
      console.log('Overview data response:', overview);
      setOverviewData(overview);
      
      // Fetch expiring plans
      const expiring = await fetchExpiringPlans(days);
      console.log(`Expiring plans (${days} days) response:`, expiring);
      setExpiringPlans(expiring);
      
      // Fetch batch summary
      const batches = await fetchBatchSummary();
      console.log('Batch summary response:', batches);
      setBatchSummary(batches);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = () => {
    fetchData();
  };

  const sendReminders = async (daysBeforeExpiry: number = 3) => {
    try {
      const payload = { daysBeforeExpiry };
      console.log('Sending reminders payload:', payload);
      
      const response = await sendExpiryReminders(payload);
      console.log('Reminders response:', response);
      
      return response;
    } catch (err) {
      console.error('Error sending reminders:', err);
      throw err;
    }
  };

  return {
    overviewData,
    expiringPlans,
    batchSummary,
    loading,
    error,
    refreshData,
    sendReminders
  };
}; 