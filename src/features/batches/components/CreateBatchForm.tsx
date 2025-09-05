import React, { useState, useEffect } from 'react';
import { Plan } from '../types';
import { usePlans } from '../hooks/useBatches';

interface CreateBatchFormProps {
  onSubmit: (batchData: {
    name: string;
    time: string;
    maxMembers?: number;
    linkedPlanIds: string[];
  }) => Promise<void>;
  onCancel: () => void;
  initialPlanId?: string;
}

const CreateBatchForm: React.FC<CreateBatchFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialPlanId 
}) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [maxMembers, setMaxMembers] = useState<string>('');
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(
    initialPlanId ? [initialPlanId] : []
  );
  
  const { plans, loading: plansLoading } = usePlans();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await onSubmit({
        name,
        time,
        maxMembers: maxMembers ? parseInt(maxMembers) : undefined,
        linkedPlanIds: selectedPlanIds,
      });
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };
  
  const handlePlanToggle = (planId: string) => {
    setSelectedPlanIds(prev => 
      prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Batch</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch Name
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
            Time Slot
          </label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 6:00AM - 7:00AM"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Members (Optional)
          </label>
          <input
            type="number"
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link to Plans
          </label>
          
          {plansLoading ? (
            <div className="text-gray-500">Loading plans...</div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2">
              {plans.map(plan => (
                <div key={plan.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`plan-${plan.id}`}
                    checked={selectedPlanIds.includes(plan.id)}
                    onChange={() => handlePlanToggle(plan.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`plan-${plan.id}`} className="ml-2 block text-sm text-gray-900">
                    {plan.name} ({plan.duration})
                  </label>
                </div>
              ))}
              {plans.length === 0 && (
                <div className="text-gray-500 text-sm">No plans available</div>
              )}
            </div>
          )}
        </div>
        
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
            Create Batch
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBatchForm; 