import { User } from "../features/users/types";
import { mockUsers } from "./mockData";

class UsersService {
  async getAll(): Promise<User[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 500);
    });
  }

  async getById(id: string): Promise<User> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === id);
        if (user) {
          resolve(user);
        } else {
          reject(new Error("User not found"));
        }
      }, 500);
    });
  }

  async create(user: Omit<User, "id" | "joinedAt">): Promise<User> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...user,
          id: `user${mockUsers.length + 1}`,
          joinedAt: new Date().toISOString()
        };
        resolve(newUser);
      }, 500);
    });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          const updatedUser = { ...mockUsers[userIndex], ...user };
          resolve(updatedUser);
        } else {
          reject(new Error("User not found"));
        }
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === id);
        if (userIndex !== -1) {
          resolve();
        } else {
          reject(new Error("User not found"));
        }
      }, 500);
    });
  }
}

export default new UsersService(); 