import axios from 'axios';
import { Payment, PaymentFilter, PaymentStatus } from '../types/payment';
import { API_BASE_URL, API_ENDPOINTS, ApiResponse } from '../../../config/api';

// Interface for the payment data from the API
interface ApiPayment {
  id: string;
  user_id: string;
  plan_id: string;
  amount: number;
  status: string;
  stripe_payment_id: string;
  payment_method: string;
  paid_at: string;
  created_at: string;
  updated_at: string;
  refund_amount?: number;
  refunded_at?: string;
  notes?: string;
}

// Map API payment status to our application's payment status
const mapApiStatus = (apiStatus: string): PaymentStatus => {
  switch (apiStatus.toLowerCase()) {
    case 'succeeded':
      return 'paid';
    case 'failed':
      return 'failed';
    case 'refunded':
      return 'refunded';
    case 'partially_refunded':
      return 'partially_refunded';
    default:
      return 'failed';
  }
};

// Map API payment method to our application's payment method
const mapApiPaymentMethod = (apiMethod: string): Payment['paymentMethod'] => {
  switch (apiMethod.toLowerCase()) {
    case 'card':
      return 'credit_card';
    case 'upi':
      return 'upi';
    case 'netbanking':
      return 'net_banking';
    case 'wallet':
      return 'wallet';
    default:
      return 'credit_card';
  }
};

// Transform API payment to our application's payment format
const transformApiPayment = async (apiPayment: ApiPayment): Promise<Payment> => {
  // In a real application, we would fetch user and plan details
  // For now, we'll use placeholder data
  const userName = `User ${apiPayment.user_id}`;
  const planName = `Plan ${apiPayment.plan_id}`;
  
  return {
    id: apiPayment.id,
    userId: apiPayment.user_id,
    userName: userName,
    planId: apiPayment.plan_id,
    planName: planName,
    amount: apiPayment.amount * 100, // Convert to cents for consistency
    status: mapApiStatus(apiPayment.status),
    paymentMethod: mapApiPaymentMethod(apiPayment.payment_method),
    transactionDate: apiPayment.paid_at || apiPayment.created_at,
    refundAmount: apiPayment.refund_amount ? apiPayment.refund_amount * 100 : undefined,
    refundDate: apiPayment.refunded_at,
    notes: apiPayment.notes,
  };
};

class PaymentService {
  async getAll(): Promise<Payment[]> {
    try {
      const response = await axios.get<ApiResponse<ApiPayment[]>>(
        `${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.BASE}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch payments');
      }
      
      // Transform API payments to our application's format
      const payments = await Promise.all(
        response.data.data.map(apiPayment => transformApiPayment(apiPayment))
      );
      
      return payments;
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  async getFiltered(filter: PaymentFilter): Promise<Payment[]> {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filter.search) {
        params.append('search', filter.search);
      }
      
      if (filter.planId) {
        params.append('plan_id', filter.planId);
      }
      
      if (filter.status) {
        // Map our status to API status
        let apiStatus = '';
        switch (filter.status) {
          case 'paid':
            apiStatus = 'succeeded';
            break;
          case 'failed':
            apiStatus = 'failed';
            break;
          case 'refunded':
            apiStatus = 'refunded';
            break;
          case 'partially_refunded':
            apiStatus = 'partially_refunded';
            break;
        }
        params.append('status', apiStatus);
      }
      
      if (filter.dateFrom) {
        params.append('date_from', filter.dateFrom);
      }
      
      if (filter.dateTo) {
        params.append('date_to', filter.dateTo);
      }
      
      const response = await axios.get<ApiResponse<ApiPayment[]>>(
        `${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.BASE}?${params.toString()}`
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch filtered payments');
      }
      
      // Transform API payments to our application's format
      const payments = await Promise.all(
        response.data.data.map(apiPayment => transformApiPayment(apiPayment))
      );
      
      return payments;
    } catch (error) {
      console.error('Error fetching filtered payments:', error);
      throw error;
    }
  }

  async processRefund(
    paymentId: string,
    amount?: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.post<ApiResponse<{ refunded: boolean }>>(
        `${API_BASE_URL}${API_ENDPOINTS.PAYMENTS.REFUND(paymentId)}`,
        { amount }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to process refund');
      }
      
      return {
        success: true,
        message: response.data.message || 'Refund processed successfully',
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }
}

export default new PaymentService(); 