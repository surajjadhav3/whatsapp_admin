import { OverviewData, ExpiringPlan, BatchSummary, ReminderRequest, ReminderResponse } from '../types';

// Mock data for dashboard overview
const mockOverviewData: OverviewData = {
  totalTransactions: 125000,
  totalCustomers: 87,
  activePlans: 4,
  activeBatches: 6
};

// Mock data for expiring plans
const mockExpiringPlans: ExpiringPlan[] = [
  {
    id: '1',
    customerName: 'Rahul Sharma',
    planName: 'Monthly Yoga Plan',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    customerName: 'Priya Patel',
    planName: 'Quarterly Fitness Package',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    customerName: 'Amit Kumar',
    planName: 'Monthly Yoga Plan',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    customerName: 'Sneha Gupta',
    planName: 'Weekly Trial',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock data for batch summary
export const mockBatchSummary: BatchSummary[] = [
  {
    id: '1',
    name: 'Morning Yoga',
    timeSlot: '6–7 AM',
    membersCount: 23,
    memberLimit: 30
  },
  {
    id: '2',
    name: 'NEET Crash Batch',
    timeSlot: '5–7 PM',
    membersCount: 12,
    memberLimit: 20
  },
  {
    id: '3',
    name: 'Evening Fitness',
    timeSlot: '7–8 PM',
    membersCount: 18,
    memberLimit: 25
  },
  {
    id: '4',
    name: 'Weekend Meditation',
    timeSlot: '8–9 AM',
    membersCount: 15,
    memberLimit: 15
  }
];

// GET /dashboard/overview
export const fetchOverviewData = async (): Promise<OverviewData> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOverviewData);
    }, 800);
  });
};

// GET /dashboard/upcoming-expiries?days=7
export const fetchExpiringPlans = async (days: number = 7): Promise<ExpiringPlan[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter plans that expire within the specified days
      const filteredPlans = mockExpiringPlans.filter(plan => {
        const expiryDate = new Date(plan.expiryDate);
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= days && daysUntilExpiry > 0;
      });

      resolve(filteredPlans);
    }, 800);
  });
};

// GET /dashboard/batch-summary
export const fetchBatchSummary = async (): Promise<BatchSummary[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBatchSummary);
    }, 800);
  });
};

// POST /notifications/reminders
export const sendExpiryReminders = async (request: ReminderRequest): Promise<ReminderResponse> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate sending reminders to customers with plans expiring in X days
      const expiringInXDays = mockExpiringPlans.filter(plan => {
        const expiryDate = new Date(plan.expiryDate);
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry === request.daysBeforeExpiry;
      });

      resolve({
        sent: expiringInXDays.length,
        message: `Reminders sent to ${expiringInXDays.length} customers`
      });
    }, 1000);
  });
}; 