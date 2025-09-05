import { Batch, BatchMember, Plan } from './types';

export const mockBatches: Batch[] = [
  { id: '1', name: 'Morning Yoga', time: '6:00AM - 7:00AM', members: 25, maxMembers: 30, linkedPlanIds: ['1', '3'] },
  { id: '2', name: 'Evening Meditation', time: '5:30PM - 6:30PM', members: 18, maxMembers: 20, linkedPlanIds: ['2', '4'] },
  { id: '3', name: 'Weekend Fitness', time: '9:00AM - 10:30AM', members: 30, maxMembers: 35, linkedPlanIds: ['1', '5'] },
  { id: '4', name: 'Kids Yoga', time: '4:00PM - 5:00PM', members: 15, maxMembers: 20, linkedPlanIds: ['3'] },
  { id: '5', name: 'Senior Wellness', time: '10:00AM - 11:00AM', members: 12, maxMembers: 15, linkedPlanIds: ['2'] },
];

export const mockBatchMembers: Record<string, BatchMember[]> = {
  '1': [
    { id: '101', name: 'Anjali M.', planName: '21-Day Yoga Plan', endDate: '20 Jun 2025' },
    { id: '102', name: 'Rahul S.', planName: 'Monthly Unlimited', endDate: '15 Jul 2025' },
    { id: '103', name: 'Priya K.', planName: 'Quarterly Package', endDate: '30 Sep 2025' },
    { id: '104', name: 'Vikram D.', planName: '21-Day Yoga Plan', endDate: '25 Jun 2025' },
  ],
  '2': [
    { id: '201', name: 'Neha G.', planName: 'Monthly Unlimited', endDate: '10 Jul 2025' },
    { id: '202', name: 'Arjun P.', planName: 'Quarterly Package', endDate: '22 Aug 2025' },
    { id: '203', name: 'Meera T.', planName: '21-Day Yoga Plan', endDate: '18 Jun 2025' },
  ],
  '3': [
    { id: '301', name: 'Kiran R.', planName: 'Annual Membership', endDate: '15 May 2026' },
    { id: '302', name: 'Sanjay B.', planName: 'Monthly Unlimited', endDate: '20 Jul 2025' },
    { id: '303', name: 'Divya M.', planName: 'Quarterly Package', endDate: '10 Oct 2025' },
  ],
  '4': [
    { id: '401', name: 'Aarav S.', planName: 'Kids Monthly', endDate: '25 Jul 2025' },
    { id: '402', name: 'Ishaan K.', planName: 'Kids Monthly', endDate: '28 Jul 2025' },
  ],
  '5': [
    { id: '501', name: 'Rajesh M.', planName: 'Senior Wellness', endDate: '15 Aug 2025' },
    { id: '502', name: 'Lakshmi N.', planName: 'Senior Wellness', endDate: '20 Aug 2025' },
  ],
};

export const mockPlans: Plan[] = [
  { id: '1', name: '21-Day Yoga Plan', duration: '21 days', price: 2999, description: 'Perfect for beginners', linkedBatchIds: ['1', '3'] },
  { id: '2', name: 'Monthly Unlimited', duration: '30 days', price: 4999, description: 'Access to all classes', linkedBatchIds: ['2', '5'] },
  { id: '3', name: 'Quarterly Package', duration: '90 days', price: 11999, description: 'Best value for regular members', linkedBatchIds: ['1', '4'] },
  { id: '4', name: 'Kids Monthly', duration: '30 days', price: 2499, description: 'Special classes for children', linkedBatchIds: ['2'] },
  { id: '5', name: 'Annual Membership', duration: '365 days', price: 39999, description: 'Our premium offering', linkedBatchIds: ['3'] },
]; 