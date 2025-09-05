export type PaymentStatus = 'paid' | 'failed' | 'refunded' | 'partially_refunded';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet';

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  planId: string;
  planName: string;
  groupId?: string;
  groupName?: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionDate: string;
  refundAmount?: number;
  refundDate?: string;
  notes?: string;
}

export interface PaymentFilter {
  search?: string;
  planId?: string;
  groupId?: string;
  status?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
} 