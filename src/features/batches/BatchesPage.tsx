import React, { useState } from 'react';
import { Batch } from './types';
import { useBatches } from './hooks/useBatches';
import BatchList from './components/BatchList';
import CreateBatchForm from './components/CreateBatchForm';
import MessageBatchModal from './components/MessageBatchModal';
import * as batchesApi from './api/batchesApi';

const BatchesPage: React.FC = () => {
  const { batches, loading, error, createBatch, updateBatch, deleteBatch } = useBatches();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  
  const handleCreateBatch = async (batchData: {
    name: string;
    time: string;
    maxMembers?: number;
    linkedPlanIds: string[];
  }) => {
    try {
      await createBatch(batchData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };
  
  const handleEditBatch = (batch: Batch) => {
    setCurrentBatch(batch);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateBatch = async (batchData: {
    name: string;
    time: string;
    maxMembers?: number;
    linkedPlanIds: string[];
  }) => {
    if (!currentBatch) return;
    
    try {
      await updateBatch(currentBatch.id, {
        name: batchData.name,
        time: batchData.time,
        maxMembers: batchData.maxMembers,
        linkedPlanIds: batchData.linkedPlanIds,
      });
      setIsEditModalOpen(false);
      setCurrentBatch(null);
    } catch (error) {
      console.error('Error updating batch:', error);
    }
  };
  
  const handleDeleteBatch = async (batchId: string) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      try {
        await deleteBatch(batchId);
      } catch (error) {
        console.error('Error deleting batch:', error);
      }
    }
  };
  
  const handleMessageBatch = (batch: Batch) => {
    setCurrentBatch(batch);
    setIsMessageModalOpen(true);
  };
  
  const handleSendMessage = async (message: string) => {
    if (!currentBatch) return false;
    
    try {
      return await batchesApi.sendMessageToBatch(currentBatch.id, message);
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  };
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Batches</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <span className="mr-1">+</span> Create New Batch
        </button>
      </div>
      
      <BatchList
        batches={batches}
        loading={loading}
        onEdit={handleEditBatch}
        onMessage={handleMessageBatch}
      />
      
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <CreateBatchForm
              onSubmit={handleCreateBatch}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {isEditModalOpen && currentBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <CreateBatchForm
              onSubmit={handleUpdateBatch}
              onCancel={() => {
                setIsEditModalOpen(false);
                setCurrentBatch(null);
              }}
              initialPlanId={currentBatch.linkedPlanIds[0]}
            />
          </div>
        </div>
      )}
      
      {isMessageModalOpen && currentBatch && (
        <MessageBatchModal
          batch={currentBatch}
          onSend={handleSendMessage}
          onClose={() => {
            setIsMessageModalOpen(false);
            setCurrentBatch(null);
          }}
        />
      )}
    </div>
  );
};

export default BatchesPage; 