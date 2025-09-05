import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanList from "./components/PlanList";
import { usePlans } from "./hooks/usePlans";
import CreatePlanForm from "./components/CreatePlanForm";

const PlansPage: React.FC = () => {
  const { plans, loading, error, createPlan, togglePlanStatus, deletePlan } = usePlans();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreatePlan = async (planData: any) => {
    try {
      const newPlan = await createPlan(planData);
      setIsCreateModalOpen(false);
      navigate(`/plans/${newPlan.id}`);
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };
  
  const handleToggleStatus = async (planId: string, isActive: boolean) => {
    try {
      await togglePlanStatus(planId, isActive);
    } catch (error) {
      console.error('Error toggling plan status:', error);
    }
  };
  
  const handleDeletePlan = async (planId: string) => {
    try {
      await deletePlan(planId);
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  // Add these functions for navigation
  const handleView = (planId: string) => {
    navigate(`/plans/${planId}`);
  };
  
  const handleEdit = (planId: string) => {
    navigate(`/plans/${planId}/edit`);
  };

  if (loading) return <div className="flex justify-center p-8">Loading plans...</div>;
  if (error) return <div className="text-red-500 p-8">Error loading plans: {error}</div>;

  // Filter plans based on search term and active filter
  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterActive === null || plan.isActive === filterActive;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Plans</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Create New Plan
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}
      
      <PlanList
        plans={filteredPlans}
        loading={loading}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDeletePlan}
        onView={handleView}
        onEdit={handleEdit}
      />
      
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <CreatePlanForm
              onSubmit={handleCreatePlan}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage; 