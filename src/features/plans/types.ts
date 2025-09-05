import { ReactNode } from 'react';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  requiresBatch: boolean;
  isActive: boolean;
  linkedBatchIds: string[];
}

export type CreatePlanData = Omit<Plan, 'id'>;
export type UpdatePlanData = Partial<CreatePlanData>;

export interface PlanWithBatches extends Plan {
  batches: {
    id: string;
    name: string;
    time: string;
    members: number;
    maxMembers: number;
    linkedPlanIds: string[];
  }[];
} 