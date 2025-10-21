import React from "react";
import { Routes, Route } from "react-router";

// Import Store Admin/Manager pages
import StoreDashboard from "../pages/store/Dashboard/StoreDashboard";
import Branches from "../pages/store/Branch/Branches";
import Categories from "../pages/store/Category/Categories";
// import Employees from "../pages/store/Employee/StoreEmployees";
import Products from "../pages/store/Product/Products";
import { Dashboard } from "../pages/store/Dashboard";
import {
  Reports,
  Sales,
  Settings

} from "../pages/store/store-admin";
import StoreEmployees from "../pages/store/Employee/StoreEmployees";
import Stores from "../pages/store/storeInformation/Stores";
import PricingSection from "../pages/common/Landing/PricingSection";
import Upgrade from "../pages/store/upgrade/Upgrade";
import Alerts from "../pages/store/Alerts/Alerts";

const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="branches" element={<Branches />} />
        <Route path="categories" element={<Categories />} />
        <Route path="employees" element={<StoreEmployees />} />
        <Route path="products" element={<Products />} />
        <Route path="stores" element={<Stores />} />
        
        <Route path="sales" element={<Sales />} />
      
        <Route path="reports" element={<Reports />} />
        <Route path="upgrade" element={<Upgrade />} />
        <Route path="settings" element={<Settings />} />
        <Route path="alerts" element={<Alerts />} />
        {/* Add more store-specific routes here as needed */}
      </Route>
    </Routes>
  );
};

export default StoreRoutes;
