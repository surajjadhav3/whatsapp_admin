import React from "react";
import MetricCard from "./components/MetricCard";
import PlansList from "./components/PlansList";
import GroupStatusTable from "./components/GroupStatusTable";
import { mockDashboardData } from "./mockDashboardData";

// Icons (using emoji as placeholders - replace with actual icons from your library)
const RevenueIcon = () => <span>💰</span>;
const UsersIcon = () => <span>👥</span>;
const PlansIcon = () => <span>📋</span>;
const ActiveIcon = () => <span>✅</span>;
const ExpiringIcon = () => <span>⏱️</span>;
const GroupsIcon = () => <span>👪</span>;

const AnalyticsDashboard: React.FC = () => {
  const {
    totalRevenue,
    totalUsers,
    plansSold,
    activePlans,
    expiringSoon,
    groups,
  } = mockDashboardData;

  // Format currency in INR
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-secondary-800 dark:text-white transition-colors duration-200">Analytics Dashboard</h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">Overview of your business metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <MetricCard
          title="Total Revenue"
          subtitle="Sum of all completed payments"
          value={formatCurrency(totalRevenue)}
          icon={<RevenueIcon />}
        />
        
        {/* Total Users */}
        <MetricCard
          title="Total Users"
          subtitle="Users who paid and joined a plan"
          value={totalUsers}
          icon={<UsersIcon />}
        />
        
        {/* Active Plans */}
        <MetricCard
          title="Active Plans"
          subtitle="Users with active non-expired plans"
          value={activePlans}
          icon={<ActiveIcon />}
        />
        
        {/* Expiring Soon */}
        <MetricCard
          title="Expiring Soon"
          subtitle="Users whose plans expire within 3 days"
          value={expiringSoon}
          icon={<ExpiringIcon />}
        />
        
        {/* Plans Sold */}
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card hover:shadow-card-hover p-6 md:col-span-2 lg:col-span-1 transition-all duration-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">Plans Sold</h3>
              <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">Plan-wise count</p>
            </div>
            <div className="text-primary-600 dark:text-primary-400 text-2xl">
              <PlansIcon />
            </div>
          </div>
          <PlansList plans={plansSold} />
        </div>
      </div>
      
      {/* Group Status */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card hover:shadow-card-hover p-6 transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">Group Status</h3>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">User count per group link</p>
          </div>
          <div className="text-primary-600 dark:text-primary-400 text-2xl">
            <GroupsIcon />
          </div>
        </div>
        <GroupStatusTable groups={groups} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 