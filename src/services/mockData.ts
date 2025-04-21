import { Plan } from "../features/plans/types";
import { User } from "../features/users/types";
import { Group } from "../features/groups/types";

// Mock Plans Data
export const mockPlans: Plan[] = [
  {
    id: "plan1",
    name: "Basic",
    price: 9.99,
    features: ["100 messages per day", "5 groups", "Basic support"],
    maxUsers: 10,
    maxGroups: 5,
    isActive: true,
    duration: "30 days",
    subscribers: 120,
    createdAt: "2023-01-01"
  },
  {
    id: "plan2",
    name: "Standard",
    price: 19.99,
    features: ["Unlimited messages", "20 groups", "Priority support", "Message scheduling"],
    maxUsers: 50,
    maxGroups: 20,
    isActive: true,
    duration: "30 days",
    subscribers: 350,
    createdAt: "2023-01-15"
  },
  {
    id: "plan3",
    name: "Premium",
    price: 49.99,
    features: ["Unlimited messages", "Unlimited groups", "24/7 support", "Message scheduling", "Analytics", "API access"],
    maxUsers: 200,
    maxGroups: 100,
    isActive: true,
    duration: "30 days",
    subscribers: 210,
    createdAt: "2023-02-01"
  },
  {
    id: "plan4",
    name: "Enterprise",
    price: 99.99,
    features: ["Unlimited everything", "Dedicated support", "Custom integrations", "Advanced analytics"],
    maxUsers: 1000,
    maxGroups: 500,
    isActive: false,
    duration: "30 days",
    subscribers: 45,
    createdAt: "2023-03-01"
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    plan: "Premium",
    status: "active",
    joinedAt: "2023-01-15T08:30:00Z"
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    plan: "Standard",
    status: "active",
    joinedAt: "2023-02-20T10:15:00Z"
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 555-5555",
    plan: "Basic",
    status: "active",
    joinedAt: "2023-03-05T14:45:00Z"
  },
  {
    id: "user4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 222-3333",
    plan: "Standard",
    status: "active",
    joinedAt: "2023-03-10T09:20:00Z"
  },
  {
    id: "user5",
    name: "Michael Wilson",
    email: "michael@example.com",
    phone: "+1 (555) 777-8888",
    plan: "Premium",
    status: "active",
    joinedAt: "2023-04-12T11:30:00Z"
  }
];

// Mock Groups Data
export const mockGroups: Group[] = [
  {
    id: "group1",
    name: "Marketing Team",
    description: "Group for marketing team discussions",
    memberCount: 15,
    createdAt: "2023-02-10T09:00:00Z",
    ownerId: "user1",
    userCount: 15,
    capacity: 20,
    link: "https://example.com/group1",
    admin: "John Doe"
  },
  {
    id: "group2",
    name: "Development Team",
    description: "Group for development team discussions",
    memberCount: 12,
    createdAt: "2023-02-15T10:30:00Z",
    ownerId: "user5",
    userCount: 12,
    capacity: 15,
    link: "https://example.com/group2",
    admin: "Michael Wilson"
  },
  {
    id: "group3",
    name: "Customer Support",
    description: "Group for customer support team",
    memberCount: 8,
    createdAt: "2023-03-01T08:45:00Z",
    ownerId: "user2",
    userCount: 8,
    capacity: 10,
    link: "https://example.com/group3",
    admin: "Jane Smith"
  },
  {
    id: "group4",
    name: "Sales Team",
    description: "Group for sales team discussions",
    memberCount: 10,
    createdAt: "2023-03-20T14:15:00Z",
    ownerId: "user1",
    userCount: 10,
    capacity: 15,
    link: "https://example.com/group4",
    admin: "John Doe"
  },
  {
    id: "group5",
    name: "General Announcements",
    description: "Company-wide announcements",
    memberCount: 45,
    createdAt: "2023-01-05T11:00:00Z",
    ownerId: "user5",
    userCount: 45,
    capacity: 50,
    link: "https://example.com/group5",
    admin: "Michael Wilson"
  }
]; 