import React, { useState } from 'react';
import { PaymentFilter, PaymentStatus } from '../types/payment';

interface TransactionFiltersProps {
  onFilterChange: (filter: PaymentFilter) => void;
  plans: { id: string; name: string }[];
  groups: { id: string; name: string }[];
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange,
  plans,
  groups,
}) => {
  const [search, setSearch] = useState('');
  const [planId, setPlanId] = useState<string>('');
  const [groupId, setGroupId] = useState<string>('');
  const [status, setStatus] = useState<PaymentStatus | ''>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    applyFilters({ search: e.target.value });
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlanId(e.target.value);
    applyFilters({ planId: e.target.value || undefined });
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGroupId(e.target.value);
    applyFilters({ groupId: e.target.value || undefined });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as PaymentStatus | '';
    setStatus(value);
    applyFilters({ status: value || undefined });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
    applyFilters({ dateFrom: e.target.value || undefined });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
    applyFilters({ dateTo: e.target.value || undefined });
  };

  const applyFilters = (updatedFilter: Partial<PaymentFilter>) => {
    onFilterChange({
      search: updatedFilter.search !== undefined ? updatedFilter.search : search,
      planId: updatedFilter.planId !== undefined ? updatedFilter.planId : planId || undefined,
      groupId: updatedFilter.groupId !== undefined ? updatedFilter.groupId : groupId || undefined,
      status: updatedFilter.status !== undefined ? updatedFilter.status : status || undefined,
      dateFrom: updatedFilter.dateFrom !== undefined ? updatedFilter.dateFrom : dateFrom || undefined,
      dateTo: updatedFilter.dateTo !== undefined ? updatedFilter.dateTo : dateTo || undefined,
    });
  };

  const resetFilters = () => {
    setSearch('');
    setPlanId('');
    setGroupId('');
    setStatus('');
    setDateFrom('');
    setDateTo('');
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col space-y-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            placeholder="Search by user or plan name..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Plan Filter */}
          <div>
            <label htmlFor="plan-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Plan
            </label>
            <select
              id="plan-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              value={planId}
              onChange={handlePlanChange}
            >
              <option value="">All Plans</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <label htmlFor="group-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Group
            </label>
            <select
              id="group-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              value={groupId}
              onChange={handleGroupChange}
            >
              <option value="">All Groups</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
              Status
            </label>
            <select
              id="status-filter"
              className="block w-full pl-3 pr-10 py-2 text-base border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="partially_refunded">Partially Refunded</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label htmlFor="date-from" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                From
              </label>
              <input
                type="date"
                id="date-from"
                className="block w-full pl-3 pr-3 py-2 text-base border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="date-to" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                To
              </label>
              <input
                type="date"
                id="date-to"
                className="block w-full pl-3 pr-3 py-2 text-base border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                value={dateTo}
                onChange={handleDateToChange}
              />
            </div>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2 border border-secondary-300 dark:border-secondary-600 shadow-sm text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-secondary-500 dark:text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters; 