import { Plan } from "../features/plans/types";
// import { User } from "../features/users/types";


// Mock Plans Data
export const plans: Plan[] = [
  {
    id: "plan1",
    name: "Basic",
    price: 999,
    description: "Basic plan with essential features",
    duration: "1 month",
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ["1", "2"]
  },
  {
    id: "plan2",
    name: "Standard",
    price: 1999,
    description: "Standard plan with more features",
    duration: "1 month",
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ["3"]
  },
  {
    id: "plan3",
    name: "Premium",
    price: 4999,
    description: "Premium plan with all features",
    duration: "1 month",
    requiresBatch: true,
    isActive: true,
    linkedBatchIds: ["1", "4"]
  },
  {
    id: "plan4",
    name: "Enterprise",
    price: 9999,
    description: "Enterprise plan for large organizations",
    duration: "1 month",
    requiresBatch: false,
    isActive: false,
    linkedBatchIds: []
  }
];

// Mock Users Data
// export const mockUsers: User[] = [
//   {
//     id: "user1",
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "+1 (555) 123-4567",
//     plan: "Premium",
//     status: "active",
//     joinedAt: "2023-01-15T08:30:00Z"
//   },
//   {
//     id: "user2",
//     name: "Jane Smith",
//     email: "jane@example.com",
//     phone: "+1 (555) 987-6543",
//     plan: "Standard",
//     status: "active",
//     joinedAt: "2023-02-20T10:15:00Z"
//   },
//   {
//     id: "user3",
//     name: "Robert Johnson",
//     email: "robert@example.com",
//     phone: "+1 (555) 555-5555",
//     plan: "Basic",
//     status: "active",
//     joinedAt: "2023-03-05T14:45:00Z"
//   },
//   {
//     id: "user4",
//     name: "Emily Davis",
//     email: "emily@example.com",
//     phone: "+1 (555) 222-3333",
//     plan: "Standard",
//     status: "active",
//     joinedAt: "2023-03-10T09:20:00Z"
//   },
//   {
//     id: "user5",
//     name: "Michael Wilson",
//     email: "michael@example.com",
//     phone: "+1 (555) 777-8888",
//     plan: "Premium",
//     status: "active",
//     joinedAt: "2023-04-12T11:30:00Z"
//   }
// ];

