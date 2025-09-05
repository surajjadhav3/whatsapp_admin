
import { mockPlans } from '../mockData';
import { Plan } from '../types';

export const getPlanById = async (planId: string): Promise<Plan> => {
  console.log('Fetching plan with ID:', planId);
  
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const plan = mockPlans.find(p => p.id === planId);
      if (plan) {
        console.log('Plan found:', plan);
        resolve(plan);
      } else {
        const error = `Plan with ID ${planId} not found`;
        console.error(error);
        reject(new Error(error));
      }
    }, 300);
  });
};

export const getActivePlans = async (): Promise<Plan[]> => {
  console.log('Fetching active plans');
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const activePlans = mockPlans.filter(plan => plan.isActive);
      console.log('Active plans found:', activePlans);
      resolve(activePlans);
    }, 300);
  });
}; 