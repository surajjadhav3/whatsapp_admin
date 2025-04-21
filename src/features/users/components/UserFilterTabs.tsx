import React from 'react';
import { UserFilter } from '../types/user';

interface UserFilterTabsProps {
  activeFilter: UserFilter;
  onFilterChange: (filter: UserFilter) => void;
  counts: {
    all: number;
    active: number;
    expired: number;
    expiring_soon: number;
  };
}

const UserFilterTabs: React.FC<UserFilterTabsProps> = ({ 
  activeFilter, 
  onFilterChange,
  counts
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeFilter === 'all'
            ? 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100'
            : 'bg-white text-secondary-600 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
        }`}
      >
        All Users
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-300">
          {counts.all}
        </span>
      </button>
      
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeFilter === 'active'
            ? 'bg-success-100 text-success-800 dark:bg-success-800 dark:text-success-100'
            : 'bg-white text-secondary-600 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
        }`}
      >
        Active Plans
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-success-100 text-success-800 dark:bg-success-700 dark:text-success-300">
          {counts.active}
        </span>
      </button>
      
      <button
        onClick={() => onFilterChange('expired')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeFilter === 'expired'
            ? 'bg-danger-100 text-danger-800 dark:bg-danger-800 dark:text-danger-100'
            : 'bg-white text-secondary-600 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
        }`}
      >
        Expired Plans
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-danger-100 text-danger-800 dark:bg-danger-700 dark:text-danger-300">
          {counts.expired}
        </span>
      </button>
      
      <button
        onClick={() => onFilterChange('expiring_soon')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          activeFilter === 'expiring_soon'
            ? 'bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100'
            : 'bg-white text-secondary-600 hover:bg-secondary-50 dark:bg-secondary-800 dark:text-secondary-300 dark:hover:bg-secondary-700'
        }`}
      >
        Expiring Soon
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-warning-100 text-warning-800 dark:bg-warning-700 dark:text-warning-300">
          {counts.expiring_soon}
        </span>
      </button>
    </div>
  );
};

export default UserFilterTabs; 