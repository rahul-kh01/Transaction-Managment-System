import React from "react";
import { Routes, Route } from "react-router";

// Import SuperAdmin pages
import SuperAdminDashboard from "../pages/SuperAdminDashboard/SuperAdminDashboard";
import Dashboard from "../pages/SuperAdminDashboard/Dashboard";


import SubscriptionPlansPage from "../pages/SuperAdminDashboard/subscription/SubscriptionPlansPage";
import StoreListPage from "../pages/SuperAdminDashboard/store/StoreListPage";
import StoreDetailsPage from "../pages/SuperAdminDashboard/store/StoreDetailsPage";
import PendingRequestsPage from "../pages/SuperAdminDashboard/store/PendingRequestsPage";
import SettingsPage from "@/pages/SuperAdminDashboard/settings/SettingsPage";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stores" element={<StoreListPage />} />
        <Route path="stores/:id" element={<StoreDetailsPage />} />
        <Route path="requests" element={<PendingRequestsPage />} />
        <Route path="subscriptions" element={<SubscriptionPlansPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};

export default SuperAdminRoutes; 