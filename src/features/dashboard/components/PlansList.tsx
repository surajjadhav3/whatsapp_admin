import React from "react";
import { Plan } from "../mockDashboardData";

interface PlansListProps {
  plans: Plan[];
}

const PlansList: React.FC<PlansListProps> = ({ plans }) => {
  return (
    <div className="space-y-3 mt-3">
      {plans.map((plan) => (
        <div key={plan.id} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors duration-150">
          <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">{plan.name}</span>
          <span className="text-sm font-medium bg-primary-100 dark:bg-primary-700/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
            {plan.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PlansList; 