import { Plan, CreatePlanData, UpdatePlanData, PlanWithBatches } from '../types';
import { mockPlans, getBatchesForPlan } from '../mockData';

// This file contains API placeholders that would be replaced with actual API calls

export const fetchPlans = async (): Promise<Plan[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPlans]);
    }, 500);
  });
};

export const fetchPlanById = async (planId: string): Promise<Plan | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = mockPlans.find(p => p.id === planId) || null;
      resolve(plan ? { ...plan } : null);
    }, 500);
  });
};

export const fetchPlanWithBatches = async (planId: string): Promise<PlanWithBatches | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = mockPlans.find(p => p.id === planId);
      if (!plan) {
        resolve(null);
        return;
      }

      const batches = getBatchesForPlan(planId);
      resolve({
        ...plan,
        batches: batches.map(b => ({
          id: b.id,
          name: b.name,
          time: b.time,
          members: b.members,
          maxMembers: b.maxMembers || 30,
          linkedPlanIds: b.linkedPlanIds || [planId]
        }))
      });
    }, 500);
  });
};

export const createPlan = async (planData: CreatePlanData): Promise<Plan> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPlan: Plan = {
        id: Date.now().toString(),
        ...planData
      };
      resolve(newPlan);
    }, 500);
  });
};

export const updatePlan = async (planId: string, planData: UpdatePlanData): Promise<Plan> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const planIndex = mockPlans.findIndex(p => p.id === planId);
      if (planIndex === -1) {
        reject(new Error('Plan not found'));
        return;
      }

      const updatedPlan = {
        ...mockPlans[planIndex],
        ...planData
      };
      resolve(updatedPlan);
    }, 500);
  });
};

export const deletePlan = async (planId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const togglePlanStatus = async (planId: string, isActive: boolean): Promise<Plan> => {
  // Simulate API call
  return updatePlan(planId, { isActive });
};

export const linkBatchToPlan = async (planId: string, batchId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const planIndex = mockPlans.findIndex(p => p.id === planId);
      if (planIndex === -1) {
        reject(new Error('Plan not found'));
        return;
      }

      // In a real implementation, this would update both the plan and batch
      resolve(true);
    }, 500);
  });
};

export const unlinkBatchFromPlan = async (planId: string, batchId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const planIndex = mockPlans.findIndex(p => p.id === planId);
      if (planIndex === -1) {
        reject(new Error('Plan not found'));
        return;
      }

      // In a real implementation, this would update both the plan and batch
      resolve(true);
    }, 500);
  });
}; 