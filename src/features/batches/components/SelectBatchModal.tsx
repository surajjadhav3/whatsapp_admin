import React, { useState, useEffect } from 'react';
import { Batch } from '../types';
import * as batchesApi from '../api/batchesApi';

interface SelectBatchModalProps {
  planId: string;
  onSelect: (batchId: string) => Promise<void>;
  onCancel: () => void;
  linkedBatchIds: string[];
}

const SelectBatchModal: React.FC<SelectBatchModalProps> = ({ 
  planId, 
  onSelect, 
  onCancel,
  linkedBatchIds
}) => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  
  useEffect(() => {
    const fetchAvailableBatches = async () => {
      try {
        setLoading(true);
        const allBatches = await batchesApi.fetchBatches();
        // Filter out already linked batches
        const availableBatches = allBatches.filter(
          batch => !linkedBatchIds.includes(batch.id)
        );
        setBatches(availableBatches);
      } catch (error) {
        console.error('Error fetching batches:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailableBatches();
  }, [linkedBatchIds]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchId) return;
    
    try {
      await onSelect(selectedBatchId);
    } catch (error) {
      console.error('Error linking batch:', error);
    }
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Select Batch to Link</h2>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {batches.length === 0 ? (
            <div className="text-gray-500 mb-4">
              No available batches to link. All batches are already linked or no batches exist.
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a Batch
              </label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Select a batch --</option>
                {batches.map(batch => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} ({batch.time})
                  </option>
                ))}
              </select>
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
              disabled={!selectedBatchId || batches.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              Link Batch
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SelectBatchModal; 