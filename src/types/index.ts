import { User as FeatureUser } from '../features/users/types';

import { Plan as FeaturePlan } from '../features/plans/types';

export type User = FeatureUser;

export type Plan = FeaturePlan;

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
} 