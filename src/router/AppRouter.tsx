import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import UsersPage from "../features/users/UsersPage";
import UserDetailsPage from "../features/users/UserDetailsPage";
import PlansPage from "../features/plans/PlansPage";
import PlanDetailsPage from "../features/plans/PlanDetailsPage";
import EditPlanPage from "../features/plans/EditPlanPage";
import BatchesPage from "../features/batches/BatchesPage";
import BatchDetailsPage from "../features/batches/BatchDetailsPage";
import SettingsPage from "../features/settings/SettingsPage";
import AnalyticsDashboard from "../features/dashboard/AnalyticsDashboard";
import TransactionsPage from "../features/payments/TransactionsPage";
import LandingPage from "../features/landing/LandingPage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path="payments" element={<TransactionsPage />} />
          <Route path="users">
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserDetailsPage />} />
          </Route>

          <Route path="plans">
            <Route index element={<PlansPage />} />
            <Route path=":planId" element={<PlanDetailsPage />} />
            <Route path=":planId/edit" element={<EditPlanPage />} />
          </Route>

          <Route path="batches">
            <Route index element={<BatchesPage />} />
            <Route path=":batchId" element={<BatchDetailsPage />} />
          </Route>

          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Public Landing Page */}
        <Route path="/landing/:id" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
