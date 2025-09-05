
import { mockBatches } from '../mockData';
import { Batch } from '../types';

export const getBatchById = async (batchId: string): Promise<Batch> => {
  console.log('Fetching batch with ID:', batchId);
  
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const batch = mockBatches.find(b => b.id === batchId);
      if (batch) {
        console.log('Batch found:', batch);
        resolve(batch);
      } else {
        const error = `Batch with ID ${batchId} not found`;
        console.error(error);
        reject(new Error(error));
      }
    }, 300);
  });
};

// export const getActiveBatches = async (): Promise<Batch[]> => {
//   console.log('Fetching active batches');
  
//   // Simulate API delay
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const activeBatches = mockBatches.filter(batch => batch.isActive);
//       console.log('Active batches found:', activeBatches);
//       resolve(activeBatches);
//     }, 300);
//   });
// }; 