/**
 * API configuration settings
 */

// Base URL for all API requests
export const API_BASE_URL = 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
  },
  
  // User endpoints
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
    TIMELINE: (id: string) => `/api/users/${id}/timeline`,
  },
  
  // Group endpoints
  GROUPS: {
    BASE: '/api/groups',
    BY_ID: (id: string) => `/api/groups/${id}`,
    MEMBERS: (id: string) => `/api/groups/${id}/members`,
  },
  
  // Plan endpoints
  PLANS: {
    BASE: '/api/plans',
    BY_ID: (id: string) => `/api/plans/${id}`,
  },
  
  // Payment endpoints
  PAYMENTS: {
    BASE: '/api/payments',
    BY_ID: (id: string) => `/api/payments/${id}`,
    REFUND: (id: string) => `/api/payments/${id}/refund`,
  },
  HEALTH: '/api/health',
};

// Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
} 