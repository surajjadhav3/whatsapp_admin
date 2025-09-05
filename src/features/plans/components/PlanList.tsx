import React, { useState } from 'react';
import { Plan } from '../types';
import { formatCurrency } from '../../../utils/formatters';

interface PlanListProps {
  plans: Plan[];
  loading: boolean;
  onToggleStatus: (planId: string, isActive: boolean) => Promise<void>;
  onDelete: (planId: string) => Promise<void>;
  onView: (planId: string) => void;
  onEdit: (planId: string) => void;
}

const PlanList: React.FC<PlanListProps> = ({ 
  plans, 
  loading, 
  onToggleStatus, 
  onDelete,
  onView,
  onEdit
}) => {
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  
  const handleToggleStatus = async (planId: string, currentStatus: boolean) => {
    try {
      setStatusLoading(planId);
      await onToggleStatus(planId, !currentStatus);
    } finally {
      setStatusLoading(null);
    }
  };
  
  const handleDelete = async (planId: string, planName: string) => {
    if (window.confirm(`Are you sure you want to delete "${planName}"?`)) {
      await onDelete(planId);
    }
  };
  
  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map(plan => (
            <tr key={plan.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{plan.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatCurrency(plan.price)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {plan.duration}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <button
                    onClick={() => handleToggleStatus(plan.id, plan.isActive)}
                    disabled={statusLoading === plan.id}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      plan.isActive ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        plan.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                    {statusLoading === plan.id && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-4 w-4 animate-ping rounded-full bg-green-400 opacity-75"></span>
                      </span>
                    )}
                  </button>
                  <span className="ml-2 text-sm text-gray-500">
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onView(plan.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(plan.id)}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id, plan.name)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {plans.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No plans found. Create your first plan!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlanList; 