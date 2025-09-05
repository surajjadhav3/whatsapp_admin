import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import { Batch } from '../../batches/types';
import * as batchesApi from '../../batches/api/batchesApi';

interface CreatePlanFormProps {
  initialData?: Partial<Plan>;
  onSubmit: (planData: Omit<Plan, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const CreatePlanForm: React.FC<CreatePlanFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price ? (initialData.price / 100).toString() : '');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [requiresBatch, setRequiresBatch] = useState(initialData?.requiresBatch ?? false);
  const [isActive, setIsActive] = useState(initialData?.isActive ?? true);
  const [linkedBatchIds, setLinkedBatchIds] = useState<string[]>(initialData?.linkedBatchIds || []);
  
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loadingBatches, setLoadingBatches] = useState(false);
  
  useEffect(() => {
    const fetchBatches = async () => {
      if (requiresBatch) {
        try {
          setLoadingBatches(true);
          const data = await batchesApi.fetchBatches();
          setBatches(data);
        } catch (error) {
          console.error('Error fetching batches:', error);
        } finally {
          setLoadingBatches(false);
        }
      }
    };
    
    fetchBatches();
  }, [requiresBatch]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert price from dollars to cents
      const priceInCents = Math.round(parseFloat(price) * 100);
      
      await onSubmit({
        name,
        description,
        price: priceInCents,
        duration,
        requiresBatch,
        isActive,
        linkedBatchIds: requiresBatch ? linkedBatchIds : []
      });
    } catch (error) {
      console.error('Error submitting plan:', error);
    }
  };
  
  const handleBatchToggle = (batchId: string) => {
    setLinkedBatchIds(prev => 
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Plan' : 'Create New Plan'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 30 days, 3 months, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requiresBatch"
              checked={requiresBatch}
              onChange={(e) => setRequiresBatch(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="requiresBatch" className="ml-2 block text-sm text-gray-900">
              Requires Batch Assignment
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>
        </div>
        
        {requiresBatch && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link to Batches
            </label>
            
            {loadingBatches ? (
              <div className="text-gray-500">Loading batches...</div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2">
                {batches.map(batch => (
                  <div key={batch.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`batch-${batch.id}`}
                      checked={linkedBatchIds.includes(batch.id)}
                      onChange={() => handleBatchToggle(batch.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`batch-${batch.id}`} className="ml-2 block text-sm text-gray-900">
                      {batch.name} ({batch.time})
                    </label>
                  </div>
                ))}
                {batches.length === 0 && (
                  <div className="text-gray-500 text-sm">No batches available</div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {initialData ? 'Update Plan' : 'Create Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlanForm; 