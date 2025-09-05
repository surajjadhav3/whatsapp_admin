import { Plan } from './types';
import { mockBatches } from '../batches/mockData';

export const mockPlans: Plan[] = [
  {
    id: '1',
    name: '21-Day Yoga Plan',
    description: 'Perfect for beginners looking to start their yoga journey.',
    price: 2999,
    duration: '21 days',
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ['1', '3']
  },
  {
    id: '2',
    name: 'Monthly Unlimited',
    description: 'Access to all classes for a full month. Great value for regular practitioners.',
    price: 4999,
    duration: '30 days',
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ['2', '5']
  },
  {
    id: '3',
    name: 'Quarterly Package',
    description: 'Best value for regular members. Access all classes for 3 months.',
    price: 11999,
    duration: '90 days',
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ['1', '4']
  },
  {
    id: '4',
    name: 'Kids Monthly',
    description: 'Special classes designed for children aged 6-12.',
    price: 2499,
    duration: '30 days',
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ['2']
  },
  {
    id: '5',
    name: 'Annual Membership',
    description: 'Our premium offering with full access for a year plus special workshops.',
    price: 39999,
    duration: '365 days',
    requiresBatch: false,
    isActive: true,
    linkedBatchIds: ['3']
  },
  {
    id: '6',
    name: 'Private Sessions',
    description: 'One-on-one sessions with our expert instructors.',
    price: 1500,
    duration: 'Per session',
    requiresBatch: false,
    isActive: false,
    linkedBatchIds: []
  }
];

// Helper function to get batches for a plan
export const getBatchesForPlan = (planId: string) => {
  const plan = mockPlans.find(p => p.id === planId);
  if (!plan) return [];
  
  return mockBatches.filter(batch => plan.linkedBatchIds.includes(batch.id));
}; 