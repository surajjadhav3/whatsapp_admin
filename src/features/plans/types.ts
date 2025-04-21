import { ReactNode } from 'react';

export interface Plan {
  duration: ReactNode;
  subscribers: ReactNode;
  createdAt: string | number | Date;
  id: string;
  name: string;
  price: number;
  features: string[];
  maxUsers: number;
  maxGroups: number;
  isActive: boolean;
} 