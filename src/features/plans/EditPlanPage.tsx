import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlanDetails } from './hooks/usePlans';
import CreatePlanForm from './components/CreatePlanForm';

const EditPlanPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { plan, loading, error, updatePlan } = usePlanDetails(planId || '');
  
  const handleUpdatePlan = async (planData: any) => {
    try {
      await updatePlan(planData);
      navigate(`/plans/${planId}`);
    } catch (error) {
      console.error('Error updating plan:', error);
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
          onClick={() => navigate(`/plans/${planId}`)}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Plan Details
        </button>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Plan</h1>
      
      {plan ? (
        <CreatePlanForm
          initialData={plan}
          onSubmit={handleUpdatePlan}
          onCancel={() => navigate(`/plans/${planId}`)}
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

export default EditPlanPage; 