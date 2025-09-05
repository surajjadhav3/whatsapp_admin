import React, { useState, useEffect } from 'react';
import { Batch } from '../types';

interface BatchFormProps {
  batch?: Batch;
  onSave: (batchData: Omit<Batch, 'id' | 'members'> & { id?: string }) => void;
  onCancel: () => void;
}

const BatchForm: React.FC<BatchFormProps> = ({ batch, onSave, onCancel }) => {
  const [name, setName] = useState(batch?.name || '');
  const [time, setTime] = useState(batch?.time || '');
  const [maxMembers, setMaxMembers] = useState<string>(
    batch?.maxMembers ? batch.maxMembers.toString() : ''
  );
  const [linkedPlanIds, setLinkedPlanIds] = useState<string[]>(
    batch?.linkedPlanIds || []
  );

  useEffect(() => {
    if (batch) {
      setName(batch.name);
      setTime(batch.time);
      setMaxMembers(batch.maxMembers ? batch.maxMembers.toString() : '');
      setLinkedPlanIds(batch.linkedPlanIds);
    }
  }, [batch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: batch?.id,
      name,
      time,
      maxMembers: maxMembers ? parseInt(maxMembers) : undefined,
      linkedPlanIds,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {batch ? 'Edit Batch' : 'Create New Batch'}
        </h2>
        
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 6:00AM - 7:00AM"
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
          
          {/* Note: In a real implementation, you would add a plan selector here */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Note: Plan linking is available in the detailed view
            </p>
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
              {batch ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchForm; 