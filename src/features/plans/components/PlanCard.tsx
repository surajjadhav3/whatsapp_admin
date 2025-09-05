import React from 'react';
import { PlanWithBatches } from '../types';
import { formatCurrency } from '../../../utils/formatters';

interface PlanCardProps {
  plan: PlanWithBatches;
  onClick?: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          plan.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {plan.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(plan.price)}
        </div>
        <div className="text-sm text-gray-600">
          {plan.duration}
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {plan.description}
      </p>
      
      {plan.batches.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Available Batches
          </h4>
          <div className="space-y-1">
            {plan.batches.slice(0, 3).map(batch => (
              <div key={batch.id} className="text-sm text-gray-700">
                {batch.name} ({batch.time})
              </div>
            ))}
            {plan.batches.length > 3 && (
              <div className="text-sm text-blue-600">
                +{plan.batches.length - 3} more batches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanCard; 