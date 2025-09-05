import React, { useState } from 'react';
import { PlanWithBatches, Plan } from '../types';
import { formatCurrency } from '../../../utils/formatters';
import SelectBatchModal from '../../batches/components/SelectBatchModal';
import CreateBatchForm from '../../batches/components/CreateBatchForm';
import { Batch } from '../../batches/types';

interface PlanDetailProps {
  plan: PlanWithBatches;
  loading: boolean;
  onToggleStatus: (isActive: boolean) => Promise<Plan | null>;
  onLinkBatch: (batchId: string) => Promise<boolean>;
  onUnlinkBatch: (batchId: string) => Promise<boolean>;
  onCreateAndLinkBatch: (batchData: any) => Promise<Batch>;
}

const PlanDetail: React.FC<PlanDetailProps> = ({ 
  plan, 
  loading, 
  onToggleStatus, 
  onLinkBatch, 
  onUnlinkBatch,
  onCreateAndLinkBatch
}) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [isSelectBatchModalOpen, setIsSelectBatchModalOpen] = useState(false);
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  
  const handleToggleStatus = async () => {
    try {
      setStatusLoading(true);
      await onToggleStatus(!plan.isActive);
    } finally {
      setStatusLoading(false);
    }
  };
  
  const handleLinkBatch = async (batchId: string) => {
    try {
      await onLinkBatch(batchId);
      setIsSelectBatchModalOpen(false);
    } catch (error) {
      console.error('Error linking batch:', error);
    }
  };
  
  const handleCreateAndLinkBatch = async (batchData: any) => {
    try {
      await onCreateAndLinkBatch(batchData);
      setIsCreateBatchModalOpen(false);
    } catch (error) {
      console.error('Error creating and linking batch:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{plan.name}</h1>
            <div className="text-gray-600 mb-1">Price: {formatCurrency(plan.price)}</div>
            <div className="text-gray-600 mb-1">Duration: {plan.duration}</div>
            <div className="text-gray-600 mb-4">Requires Batch: {plan.requiresBatch ? 'Yes' : 'No'}</div>
            <p className="text-gray-700">{plan.description}</p>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleToggleStatus}
              disabled={statusLoading}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                plan.isActive ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  plan.isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
              {statusLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-4 w-4 animate-ping rounded-full bg-green-400 opacity-75"></span>
                </span>
              )}
            </button>
            <span className="ml-2 text-sm text-gray-500">
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Linked Batches</h2>
          <div className="space-x-2">
            <button
              onClick={() => setIsSelectBatchModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              + Add Existing Batch
            </button>
            <button
              onClick={() => setIsCreateBatchModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              + Create & Link New Batch
            </button>
          </div>
        </div>
        
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Slot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plan.batches.map(batch => (
              <tr key={batch.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{batch.name}</td>
                <td className="px-6 py-4">{batch.time}</td>
                <td className="px-6 py-4">{batch.members}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => window.location.href = `/batches/${batch.id}`}
                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onUnlinkBatch(batch.id)}
                    className="text-red-600 hover:text-red-900 font-medium text-sm"
                  >
                    Unlink
                  </button>
                </td>
              </tr>
            ))}
            {plan.batches.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No batches linked to this plan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isSelectBatchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <SelectBatchModal
              planId={plan.id}
              onSelect={handleLinkBatch}
              onCancel={() => setIsSelectBatchModalOpen(false)}
              linkedBatchIds={plan.linkedBatchIds}
            />
          </div>
        </div>
      )}
      
      {isCreateBatchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-md">
            <CreateBatchForm
              onSubmit={handleCreateAndLinkBatch}
              onCancel={() => setIsCreateBatchModalOpen(false)}
              initialPlanId={plan.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDetail; 