import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AnalyticsDashboard from "../features/dashboard/AnalyticsDashboard";
import PlansPage from "../features/plans/PlansPage";
import GroupsPage from "../features/groups/GroupsPage";
import UserDashboard from "../features/users/UserDashboard";

const AppRouter: React.FC = () => {
  // This is a simple example - you might want to add authentication logic here
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/dashboard" element={<AnalyticsDashboard />} />
      <Route path="/users" element={<UserDashboard />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRouter; 