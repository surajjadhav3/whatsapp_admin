import React, { useState } from "react";
import OverviewCards from "./components/OverviewCards";
import ExpiringPlansTable from "./components/ExpiringPlansTable";
import BatchSummaryTable from "./components/BatchSummaryTable";
import LandingPageGenerator from "../landing/components/LandingPageGenerator";
import { useDashboardData } from "./hooks/useDashboardData";

const AnalyticsDashboard: React.FC = () => {
  const [expiryDays, setExpiryDays] = useState<number>(7);
  const {
    overviewData,
    expiringPlans,
    batchSummary,
    loading,
    error,
    refreshData,
    sendReminders,
  } = useDashboardData(expiryDays);

  const handleRefresh = () => {
    refreshData();
  };

  const handleExpiryDaysChange = (days: number) => {
    setExpiryDays(days);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={expiryDays}
              onChange={(e) => handleExpiryDaysChange(Number(e.target.value))}
              className="appearance-none bg-white dark:bg-secondary-700 border border-gray-300 dark:border-secondary-600 rounded-md py-2 pl-3 pr-8 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            >
              <option value={7}>Next 7 Days</option>
              <option value={14}>Next 14 Days</option>
              <option value={30}>Next 30 Days</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <OverviewCards data={overviewData} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpiringPlansTable
          data={expiringPlans}
          loading={loading}
          days={expiryDays}
          onSendReminders={sendReminders}
        />

        <BatchSummaryTable data={batchSummary} loading={loading} />
      </div>

      <LandingPageGenerator />
    </div>
  );
};

export default AnalyticsDashboard;
