export interface OverviewData {
  totalTransactions: number;
  totalCustomers: number;
  activePlans: number;
  activeBatches: number;
}

export interface ExpiringPlan {
  id: string;
  customerName: string;
  planName: string;
  expiryDate: string;
}

export interface BatchSummary {
  id: string;
  name: string;
  timeSlot: string;
  membersCount: number;
  memberLimit: number;
}

export interface ReminderResponse {
  sent: number;
  message: string;
}

export interface ReminderRequest {
  daysBeforeExpiry: number;
} 