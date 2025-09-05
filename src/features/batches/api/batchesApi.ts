import { Batch, BatchMember, Plan } from '../types';
import { mockBatches, mockBatchMembers, mockPlans } from '../mockData';

// This file contains API placeholders that would be replaced with actual API calls

export const fetchBatches = async (): Promise<Batch[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBatches);
    }, 500);
  });
};

export const fetchBatchById = async (batchId: string): Promise<Batch | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const batch = mockBatches.find(b => b.id === batchId) || null;
      resolve(batch);
    }, 500);
  });
};

export const fetchBatchMembers = async (batchId: string): Promise<BatchMember[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBatchMembers[batchId] || []);
    }, 500);
  });
};

export const createBatch = async (batchData: Omit<Batch, 'id' | 'members'>): Promise<Batch> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBatch: Batch = {
        id: Date.now().toString(),
        ...batchData,
        members: 0,
      };
      resolve(newBatch);
    }, 500);
  });
};

export const updateBatch = async (batchId: string, batchData: Partial<Batch>): Promise<Batch> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const batchIndex = mockBatches.findIndex(b => b.id === batchId);
      if (batchIndex >= 0) {
        const updatedBatch = { ...mockBatches[batchIndex], ...batchData };
        resolve(updatedBatch);
      } else {
        throw new Error('Batch not found');
      }
    }, 500);
  });
};

export const deleteBatch = async (batchId: string): Promise<boolean> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const fetchPlans = async (): Promise<Plan[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlans);
    }, 500);
  });
};

export const linkBatchToPlan = async (batchId: string, planId: string): Promise<boolean> => {
  // Simulate API call - in a real app, this would update both the batch and plan
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const unlinkBatchFromPlan = async (batchId: string, planId: string): Promise<boolean> => {
  // Simulate API call - in a real app, this would update both the batch and plan
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};

export const sendMessageToBatch = async (batchId: string, message: string): Promise<boolean> => {
  // Simulate API call - in a real app, this would send a WhatsApp message to all members
  return new Promise((resolve) => {
    console.log(`Sending message to batch ${batchId}: ${message}`);
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
}; 