import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanDetails } from './hooks/usePlans';
import PlanDetail from './components/PlanDetail';
import * as batchesApi from '../batches/api/batchesApi';

const PlanDetailsPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { 
    plan, 
    loading, 
    error, 
    toggleStatus, 
    linkBatch, 
    unlinkBatch 
  } = usePlanDetails(planId || '');
  
  const handleCreateAndLinkBatch = async (batchData: any) => {
    try {
      // First create the batch
      const newBatch = await batchesApi.createBatch({
        ...batchData,
        linkedPlanIds: [planId || '']
      });
      
      // Then link it to the plan
      if (planId) {
        await linkBatch(newBatch.id);
      }
      
      return newBatch;
    } catch (error) {
      console.error('Error creating and linking batch:', error);
      throw error;
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
      <div className="mb-6">
        <button
          onClick={() => navigate('/plans')}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Plans
        </button>
      </div>
      
      {plan ? (
        <PlanDetail
          plan={plan}
          loading={loading}
          onToggleStatus={toggleStatus}
          onLinkBatch={linkBatch}
          onUnlinkBatch={unlinkBatch}
          onCreateAndLinkBatch={handleCreateAndLinkBatch}
        />
      ) : loading ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">Plan not found</p>
        </div>
      )}
    </div>
  );
};

export default PlanDetailsPage; 