import { mockPlans } from "../features/plans/mockData";
import { Plan } from "../features/plans/types";


class PlansService {
  async getAll(): Promise<Plan[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPlans);
      }, 500);
    });
  }

  async getById(id: string): Promise<Plan> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const plan = mockPlans.find(p => p.id === id);
        if (plan) {
          resolve(plan);
        } else {
          reject(new Error("Plan not found"));
        }
      }, 500);
    });
  }

  async create(plan: Omit<Plan, "id">): Promise<Plan> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlan: Plan = {
          ...plan,
          id: `plan${mockPlans.length + 1}`
        };
        resolve(newPlan);
      }, 500);
    });
  }

  async update(id: string, plan: Partial<Plan>): Promise<Plan> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const planIndex = mockPlans.findIndex(p => p.id === id);
        if (planIndex !== -1) {
          const updatedPlan = { ...mockPlans[planIndex], ...plan };
          resolve(updatedPlan);
        } else {
          reject(new Error("Plan not found"));
        }
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const planIndex = mockPlans.findIndex(p => p.id === id);
        if (planIndex !== -1) {
          resolve();
        } else {
          reject(new Error("Plan not found"));
        }
      }, 500);
    });
  }
}

export default new PlansService(); 