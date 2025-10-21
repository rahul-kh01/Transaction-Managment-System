import React from "react";
import DashboardStats from "./DashboardStats";
import RecentSales from "./RecentSales";
import SalesTrend from "./SalesTrend";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      {/* Stats Overview */}
      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Recent Sales */}
        <RecentSales />

        {/* Sales Trend */}
        <SalesTrend />
      </div>
    </div>
  );
}