export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  plan: {
    title: string;
    startDate: string;
    endDate: string;
  };
  status: 'active' | 'expired' | 'expiring_soon';
  groupName?: string;
}

export type UserFilter = 'all' | 'active' | 'expired' | 'expiring_soon'; 