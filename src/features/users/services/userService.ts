import { User } from '../types/user';

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john@example.com',
    plan: {
      title: 'Premium Plan',
      startDate: '2023-01-15',
      endDate: '2023-12-15',
    },
    status: 'active',
    groupName: 'Marketing Team'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+91 87654 32109',
    email: 'jane@example.com',
    plan: {
      title: 'Basic Plan',
      startDate: '2023-02-10',
      endDate: '2023-08-10',
    },
    status: 'expiring_soon',
    groupName: 'Sales Team'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phone: '+91 76543 21098',
    email: 'robert@example.com',
    plan: {
      title: 'Standard Plan',
      startDate: '2022-11-05',
      endDate: '2023-05-05',
    },
    status: 'expired',
    groupName: 'Development Team'
  },
  {
    id: '4',
    name: 'Emily Davis',
    phone: '+91 65432 10987',
    email: 'emily@example.com',
    plan: {
      title: 'Premium Plan',
      startDate: '2023-03-20',
      endDate: '2023-09-20',
    },
    status: 'expiring_soon',
    groupName: 'Customer Support'
  },
  {
    id: '5',
    name: 'Michael Wilson',
    phone: '+91 54321 09876',
    email: 'michael@example.com',
    plan: {
      title: 'Enterprise Plan',
      startDate: '2023-01-10',
      endDate: '2024-01-10',
    },
    status: 'active',
    groupName: 'Management'
  }
];

class UserService {
  async getAll(): Promise<User[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500);
    });
  }

  async sendReminder(userId: string): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Reminder sent to user ${userId}`);
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

export default new UserService(); 