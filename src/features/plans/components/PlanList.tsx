import React from "react";
import { Plan } from "../types";

interface PlanListProps {
  plans: Plan[];
}

const PlanList: React.FC<PlanListProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div key={plan.id} className="card p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">{plan.name}</h3>
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{plan.duration} days</p>
            </div>
            <span className="bg-primary-100 dark:bg-primary-700/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium">
              ₹{plan.price}
            </span>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Status</span>
              <span className={`font-medium ${plan.isActive ? 'text-success-700 dark:text-success-500' : 'text-secondary-500 dark:text-secondary-400'}`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Subscribers</span>
              <span className="font-medium text-secondary-800 dark:text-secondary-200">{plan.subscribers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Created</span>
              <span className="font-medium text-secondary-800 dark:text-secondary-200">{new Date(plan.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-secondary-200 dark:border-secondary-700 flex justify-between">
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
              Edit
            </button>
            <button className="text-danger-600 dark:text-danger-400 hover:text-danger-700 dark:hover:text-danger-300 text-sm font-medium transition-colors">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlanList; 