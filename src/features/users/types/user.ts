export interface User {
  id: string;
  name: string;
  whatsapp: string; // Used as primary contact number
  email: string;
  gender: 'male' | 'female' | 'other'; // New field
  planId: string;
  batchId: string;
  plan: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
  };
  status: 'active' | 'expiring_soon' | 'expired';
  isActive: boolean;
  joinedDate: string;
  expiryDate: string;
  notes?: string;
  createdBy?: 'admin' | 'user'; // Optional tracking
  paymentStatus?: 'paid' | 'pending' | 'failed'; // For stripe tracking
  source?: 'manual' | 'checkout'; // Know how user was created
  remindersSent?: string[]; // e.g., ['expiry_3days']
  tags?: string[]; // e.g., ['VIP']
  planHistory?: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
  }>;
}

export interface UserFormData {
  name: string;
  whatsapp: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  planId: string;
  batchId: string;
  notes?: string;
  tags?: string[];
}

export interface CreateUserPayload {
  name: string;
  whatsapp: string;
  planId: string;
  batchId: string;
  notes?: string;
}

export type UserFilter = 'all' | 'active' | 'expired' | 'expiring_soon'; 