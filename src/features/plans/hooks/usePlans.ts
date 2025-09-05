import { useState, useEffect, useCallback } from 'react';
import { Plan, CreatePlanData, UpdatePlanData, PlanWithBatches } from '../types';
import * as plansApi from '../api/plansApi';

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = await plansApi.fetchPlans();
      setPlans(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const createPlan = async (planData: CreatePlanData) => {
    try {
      setLoading(true);
      const newPlan = await plansApi.createPlan(planData);
      setPlans(prev => [...prev, newPlan]);
      return newPlan;
    } catch (err) {
      setError('Failed to create plan');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (planId: string, planData: UpdatePlanData) => {
    try {
      setLoading(true);
      const updatedPlan = await plansApi.updatePlan(planId, planData);
      setPlans(prev => prev.map(plan => 
        plan.id === planId ? { ...plan, ...updatedPlan } : plan
      ));
      return updatedPlan;
    } catch (err) {
      setError('Failed to update plan');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (planId: string) => {
    try {
      setLoading(true);
      await plansApi.deletePlan(planId);
      setPlans(prev => prev.filter(plan => plan.id !== planId));
      return true;
    } catch (err) {
      setError('Failed to delete plan');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const togglePlanStatus = async (planId: string, isActive: boolean) => {
    try {
      const updatedPlan = await plansApi.togglePlanStatus(planId, isActive);
      setPlans(prev => prev.map(plan => 
        plan.id === planId ? { ...plan, isActive } : plan
      ));
      return updatedPlan;
    } catch (err) {
      setError('Failed to toggle plan status');
      console.error(err);
      throw err;
    }
  };

  return {
    plans,
    loading,
    error,
    fetchPlans,
    createPlan,
    updatePlan,
    deletePlan,
    togglePlanStatus
  };
};

export const usePlanDetails = (planId: string) => {
  const [plan, setPlan] = useState<PlanWithBatches | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanDetails = useCallback(async () => {
    if (!planId) return;
    
    try {
      setLoading(true);
      const data = await plansApi.fetchPlanWithBatches(planId);
      setPlan(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch plan details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    fetchPlanDetails();
  }, [fetchPlanDetails]);

  const updatePlan = async (planData: UpdatePlanData) => {
    if (!planId) return null;
    
    try {
      setLoading(true);
      const updatedPlan = await plansApi.updatePlan(planId, planData);
      setPlan(prev => prev ? { ...prev, ...updatedPlan } : null);
      return updatedPlan;
    } catch (err) {
      setError('Failed to update plan');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (isActive: boolean) => {
    if (!planId) return null;
    
    try {
      const updatedPlan = await plansApi.togglePlanStatus(planId, isActive);
      setPlan(prev => prev ? { ...prev, isActive } : null);
      return updatedPlan;
    } catch (err) {
      setError('Failed to toggle plan status');
      console.error(err);
      throw err;
    }
  };

  const linkBatch = async (batchId: string) => {
    if (!planId) return false;
    
    try {
      await plansApi.linkBatchToPlan(planId, batchId);
      // Refresh plan details to get updated batches
      fetchPlanDetails();
      return true;
    } catch (err) {
      setError('Failed to link batch to plan');
      console.error(err);
      throw err;
    }
  };

  const unlinkBatch = async (batchId: string) => {
    if (!planId) return false;
    
    try {
      await plansApi.unlinkBatchFromPlan(planId, batchId);
      // Update the local state to remove the batch
      setPlan(prev => {
        if (!prev) return null;
        return {
          ...prev,
          linkedBatchIds: prev.linkedBatchIds.filter(id => id !== batchId),
          batches: prev.batches.filter(batch => batch.id !== batchId)
        };
      });
      return true;
    } catch (err) {
      setError('Failed to unlink batch from plan');
      console.error(err);
      throw err;
    }
  };

  return {
    plan,
    loading,
    error,
    fetchPlanDetails,
    updatePlan,
    toggleStatus,
    linkBatch,
    unlinkBatch
  };
}; 