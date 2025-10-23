import React from 'react'
import { useSelector } from 'react-redux';
import { getChangeType } from '../data';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiDollarSign, FiShoppingBag, FiUsers, FiPackage, FiCreditCard } from "react-icons/fi";

const TodayOverview = () => {
      const { todayOverview, loading } = useSelector((state) => state.branchAnalytics);

      const kpis = todayOverview ? [
        {
          title: "Today's Sales",
          value: `₹${todayOverview.totalSales?.toLocaleString() ?? "-"}`,
          icon: <FiDollarSign className="w-8 h-8 text-primary" />,
          change: todayOverview.salesGrowth !== undefined ? `${todayOverview.salesGrowth > 0 ? "+" : ""}${todayOverview.salesGrowth.toFixed(2)}%` : "-",
          changeType: getChangeType(todayOverview.salesGrowth)
        },
        {
          title: "Orders Today",
          value: todayOverview.ordersToday ?? "-",
          icon: <FiShoppingBag className="w-8 h-8 text-primary" />,
          change: todayOverview.orderGrowth !== undefined ? `${todayOverview.orderGrowth > 0 ? "+" : ""}${todayOverview.orderGrowth.toFixed(2)}%` : "-",
          changeType: getChangeType(todayOverview.orderGrowth)
        },
        {
          title: "Active Cashiers",
          value: todayOverview.activeCashiers ?? "-",
          icon: <FiUsers className="w-8 h-8 text-primary" />,
          change: todayOverview.cashierGrowth !== undefined ? `${todayOverview.cashierGrowth > 0 ? "+" : ""}${todayOverview.cashierGrowth.toFixed(2)}%` : "-",
          changeType: getChangeType(todayOverview.cashierGrowth)
        },
        {
          title: "Low Stock Items",
          value: todayOverview.lowStockItems ?? "-",
          icon: <FiPackage className="w-8 h-8 text-primary" />,
          change: todayOverview.lowStockGrowth !== undefined ? `${todayOverview.lowStockGrowth > 0 ? "+" : ""}${todayOverview.lowStockGrowth.toFixed(2)}%` : "-",
          changeType: getChangeType(todayOverview.lowStockGrowth)
        },
      ] : [];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.length > 0 ? kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                  <p className={`text-xs font-medium mt-1 ${
                    kpi.changeType === 'positive' ? 'text-emerald-500' : 
                    kpi.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {kpi.change}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  {kpi.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="col-span-4 text-center text-gray-400">{loading ? "Loading KPIs..." : "No data available"}</div>
        )}
      </div>
  )
}

export default TodayOverview