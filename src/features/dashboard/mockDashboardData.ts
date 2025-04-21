export interface Plan {
  id: string;
  name: string;
  count: number;
}

export interface Group {
  id: string;
  name: string;
  userCount: number;
  capacity: number;
}

export interface DashboardData {
  totalRevenue: number;
  totalUsers: number;
  plansSold: Plan[];
  activePlans: number;
  expiringSoon: number;
  groups: Group[];
}

export const mockDashboardData: DashboardData = {
  totalRevenue: 234500,
  totalUsers: 187,
  plansSold: [
    { id: "plan1", name: "Yoga Basic", count: 25 },
    { id: "plan2", name: "Yoga Premium", count: 42 },
    { id: "plan3", name: "Meditation", count: 18 },
    { id: "plan4", name: "Fitness", count: 37 },
    { id: "plan5", name: "Nutrition", count: 15 }
  ],
  activePlans: 137,
  expiringSoon: 12,
  groups: [
    { id: "group1", name: "Yoga Morning Batch", userCount: 28, capacity: 30 },
    { id: "group2", name: "Yoga Evening Batch", userCount: 25, capacity: 30 },
    { id: "group3", name: "Meditation Group", userCount: 18, capacity: 20 },
    { id: "group4", name: "Fitness Enthusiasts", userCount: 27, capacity: 30 },
    { id: "group5", name: "Nutrition Support", userCount: 15, capacity: 25 }
  ]
}; 