import { Group } from "../features/groups/types";
import { mockGroups } from "./mockData";

class GroupsService {
  async getAll(): Promise<Group[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockGroups);
      }, 500);
    });
  }

  async getById(id: string): Promise<Group> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const group = mockGroups.find(g => g.id === id);
        if (group) {
          resolve(group);
        } else {
          reject(new Error("Group not found"));
        }
      }, 500);
    });
  }

  async create(group: Omit<Group, "id" | "createdAt">): Promise<Group> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newGroup: Group = {
          ...group,
          id: `group${mockGroups.length + 1}`,
          createdAt: new Date().toISOString()
        };
        resolve(newGroup);
      }, 500);
    });
  }

  async update(id: string, group: Partial<Group>): Promise<Group> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const groupIndex = mockGroups.findIndex(g => g.id === id);
        if (groupIndex !== -1) {
          const updatedGroup = { ...mockGroups[groupIndex], ...group };
          resolve(updatedGroup);
        } else {
          reject(new Error("Group not found"));
        }
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const groupIndex = mockGroups.findIndex(g => g.id === id);
        if (groupIndex !== -1) {
          resolve();
        } else {
          reject(new Error("Group not found"));
        }
      }, 500);
    });
  }
}

export default new GroupsService(); 