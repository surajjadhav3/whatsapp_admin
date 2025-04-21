import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import PlansPage from "../features/plans/PlansPage";
import UsersPage from "../features/users/UsersPage";
import GroupsPage from "../features/groups/GroupsPage";

const AppRouter: React.FC = () => {
  // This is a simple example - you might want to add authentication logic here
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/plans" 
        element={isAuthenticated ? <PlansPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/users" 
        element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/groups" 
        element={isAuthenticated ? <GroupsPage /> : <Navigate to="/login" />} 
      />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter; 