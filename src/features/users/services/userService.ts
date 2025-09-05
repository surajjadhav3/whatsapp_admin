import { User, UserFormData } from '../types/user';
import { TimelineEvent } from '../types/timeline';
import { API_ENDPOINTS } from '../../../config/api';
import { axiosInstance } from '../../../services/axios';

// Mock data with the updated fields
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    whatsapp: '+919876543210',
    email: 'john.doe@example.com',
    gender: 'male',
    planId: 'plan1',
    batchId: 'batch1',
    plan: {
      id: 'plan1',
      title: 'Premium Monthly',
      startDate: '2023-01-01',
      endDate: '2023-02-01',
    },
    status: 'active',
    isActive: true,
    joinedDate: '2023-01-01',
    expiryDate: '2023-12-31',
    notes: 'Regular attendee',
    createdBy: 'admin',
    paymentStatus: 'paid',
    source: 'manual',
    remindersSent: ['expiry_30days'],
    tags: ['VIP'],
    planHistory: [
      {
        id: 'plan0',
        title: 'Basic Monthly',
        startDate: '2022-12-01',
        endDate: '2022-12-31',
      },
      {
        id: 'plan1',
        title: 'Premium Monthly',
        startDate: '2023-01-01',
        endDate: '2023-02-01',
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    whatsapp: '+919876543211',
    email: 'jane.smith@example.com',
    gender: 'female',
    planId: 'plan2',
    batchId: 'batch2',
    plan: {
      id: 'plan2',
      title: 'Standard Monthly',
      startDate: '2023-01-15',
      endDate: '2023-02-15',
    },
    status: 'expiring_soon',
    isActive: true,
    joinedDate: '2023-01-15',
    expiryDate: '2023-02-15',
    paymentStatus: 'paid',
    source: 'checkout',
    tags: ['New'],
    planHistory: [
      {
        id: 'plan2',
        title: 'Standard Monthly',
        startDate: '2023-01-15',
        endDate: '2023-02-15',
      }
    ]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    whatsapp: '+919876543212',
    email: 'robert.johnson@example.com',
    gender: 'male',
    planId: 'plan3',
    batchId: 'batch1',
    plan: {
      id: 'plan3',
      title: 'Basic Monthly',
      startDate: '2022-12-01',
      endDate: '2023-01-01',
    },
    status: 'expired',
    isActive: false,
    joinedDate: '2022-12-01',
    expiryDate: '2023-01-01',
    notes: 'Interested in renewal',
    createdBy: 'user',
    paymentStatus: 'pending',
    source: 'manual',
    remindersSent: ['expiry_7days', 'expiry_1day', 'expired'],
    planHistory: [
      {
        id: 'plan3',
        title: 'Basic Monthly',
        startDate: '2022-12-01',
        endDate: '2023-01-01',
      }
    ]
  },
  {
    id: '4',
    name: 'Emily Davis',
    whatsapp: '+919876543213',
    email: 'emily.davis@example.com',
    gender: 'female',
    planId: 'plan4',
    batchId: 'batch3',
    plan: {
      id: 'plan4',
      title: 'Premium Yearly',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
    },
    status: 'active',
    isActive: true,
    joinedDate: '2023-01-01',
    expiryDate: '2024-01-01',
    createdBy: 'admin',
    paymentStatus: 'paid',
    source: 'checkout',
    tags: ['VIP', 'Long-term'],
    planHistory: [
      {
        id: 'plan4',
        title: 'Premium Yearly',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
      }
    ]
  },
  {
    id: '5',
    name: 'Michael Wilson',
    whatsapp: '+919876543214',
    email: 'michael.wilson@example.com',
    gender: 'other',
    planId: 'plan5',
    batchId: 'batch2',
    plan: {
      id: 'plan5',
      title: 'Standard Quarterly',
      startDate: '2023-01-01',
      endDate: '2023-04-01',
    },
    status: 'active',
    isActive: true,
    joinedDate: '2023-01-01',
    expiryDate: '2023-04-01',
    notes: 'Prefers evening classes',
    createdBy: 'user',
    paymentStatus: 'paid',
    source: 'manual',
    planHistory: [
      {
        id: 'plan5',
        title: 'Standard Quarterly',
        startDate: '2023-01-01',
        endDate: '2023-04-01',
      }
    ]
  }
];

// Mock timeline data
const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 'event1',
    userId: '1',
    type: 'joined_plan',
    title: 'Joined Premium Plan',
    description: 'User subscribed to the Premium Plan',
    timestamp: '2023-01-15T10:30:00Z',
    metadata: {
      planId: 'plan1',
      planName: 'Premium Plan'
    }
  },
  {
    id: 'event2',
    userId: '1',
    type: 'payment_completed',
    title: 'Payment Completed',
    description: 'Payment of ₹4999 received for Premium Plan',
    timestamp: '2023-01-15T10:35:00Z',
    metadata: {
      amount: 4999,
      paymentMethod: 'Credit Card',
      transactionId: 'txn_123456'
    }
  },
  {
    id: 'event3',
    userId: '1',
    type: 'group_joined',
    title: 'Joined Marketing Team Group',
    description: 'User was added to the Marketing Team group',
    timestamp: '2023-01-16T14:20:00Z',
    metadata: {
      groupId: 'group1',
      groupName: 'Marketing Team'
    }
  },
  {
    id: 'event4',
    userId: '1',
    type: 'reminder_sent',
    title: 'Plan Renewal Reminder',
    description: 'Reminder sent for plan renewal',
    timestamp: '2023-11-30T09:15:00Z',
    metadata: {
      reminderType: 'renewal',
      sentVia: 'email'
    }
  },
  {
    id: 'event5',
    userId: '2',
    type: 'joined_plan',
    title: 'Joined Basic Plan',
    description: 'User subscribed to the Basic Plan',
    timestamp: '2023-02-10T11:45:00Z',
    metadata: {
      planId: 'plan2',
      planName: 'Basic Plan'
    }
  },
  {
    id: 'event6',
    userId: '2',
    type: 'payment_completed',
    title: 'Payment Completed',
    description: 'Payment of ₹1999 received for Basic Plan',
    timestamp: '2023-02-10T11:50:00Z',
    metadata: {
      amount: 1999,
      paymentMethod: 'UPI',
      transactionId: 'txn_234567'
    }
  },
  {
    id: 'event7',
    userId: '2',
    type: 'group_joined',
    title: 'Joined Sales Team Group',
    description: 'User was added to the Sales Team group',
    timestamp: '2023-02-12T10:10:00Z',
    metadata: {
      groupId: 'group2',
      groupName: 'Sales Team'
    }
  },
  {
    id: 'event8',
    userId: '2',
    type: 'reminder_sent',
    title: 'Plan Expiry Reminder',
    description: 'Reminder sent for plan expiry',
    timestamp: '2023-07-25T16:30:00Z',
    metadata: {
      reminderType: 'expiry',
      sentVia: 'sms'
    }
  }
];

class UserService {
  async getUsers(): Promise<User[]> {
    // In a real app, this would be an API call
    // const response = await axiosInstance.get(API_ENDPOINTS.USERS.BASE);
    // return response.data;

    return Promise.resolve(mockUsers);
  }

  async getUserById(id: string): Promise<User | undefined> {
    // In a real app, this would be an API call
    // const response = await axiosInstance.get(API_ENDPOINTS.USERS.BY_ID(id));
    // return response.data;

    const user = mockUsers.find(user => user.id === id);
    return Promise.resolve(user);
  }

  async createUser(userData: UserFormData): Promise<User> {
    // In a real app, this would be an API call
    // const response = await axiosInstance.post(API_ENDPOINTS.USERS.BASE, userData);
    // return response.data;

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...userData,
      status: 'active',
      isActive: true,
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      plan: {
        id: userData.planId,
        title: 'New Plan',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      },
      createdBy: 'admin',
      paymentStatus: 'pending',
      source: 'manual',
      planHistory: [
        {
          id: userData.planId,
          title: 'New Plan',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        }
      ]
    };

    mockUsers.push(newUser);
    return Promise.resolve(newUser);
  }

  async updateUser(id: string, userData: Partial<UserFormData>): Promise<User | undefined> {
    // In a real app, this would be an API call
    // const response = await axiosInstance.put(API_ENDPOINTS.USERS.BY_ID(id), userData);
    // return response.data;

    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
    };

    return Promise.resolve(mockUsers[userIndex]);
  }

  async deleteUser(id: string): Promise<boolean> {
    // In a real app, this would be an API call
    // await axiosInstance.delete(API_ENDPOINTS.USERS.BY_ID(id));
    // return true;

    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) return false;

    mockUsers.splice(userIndex, 1);
    return Promise.resolve(true);
  }

  async getUserTimeline(userId: string): Promise<TimelineEvent[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const events = mockTimelineEvents.filter(event => event.userId === userId);
        resolve(events);
      }, 500);
    });
  }

  async sendReminder(userId: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Reminder sent to user ${userId}`);

        // Add a new reminder event to the timeline
        const newEvent: TimelineEvent = {
          id: `event${mockTimelineEvents.length + 1}`,
          userId,
          type: 'reminder_sent',
          title: 'Plan Renewal Reminder',
          description: 'Reminder sent for plan renewal',
          timestamp: new Date().toISOString(),
          metadata: {
            reminderType: 'renewal',
            sentVia: 'email'
          }
        };

        mockTimelineEvents.push(newEvent);

        resolve({ success: true, message: `Reminder sent to user ${userId}` });
      }, 500);
    });
  }

  async sendReminderToAll(): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Reminders sent to all expiring users');
        resolve({ success: true, message: 'Reminders sent to all expiring users' });
      }, 500);
    });
  }
}

export const userService = new UserService(); 