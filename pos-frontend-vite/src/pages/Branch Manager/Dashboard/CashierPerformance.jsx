import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { FiUser } from "react-icons/fi"; // ✅ replaced Lucide with Feather icon
import { getTopCashiersByRevenue } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const CashierPerformance = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { topCashiers, loading } = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getTopCashiersByRevenue(branchId));
    }
  }, [branchId, dispatch]);

  // Map API data to recharts format
  const data =
    topCashiers?.map((item) => ({
      name: item.cashierName,
      sales: item.totalRevenue,
    })) || [];

  const config = {
    sales: {
      label: "Sales",
      color: "#3b82f6",
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Cashier Performance</CardTitle>
        <div className="flex items-center gap-2">
          {/* ✅ Feather Icon Replacement */}
          <FiUser className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-500">Top 5 Cashiers</span>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-64">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 40,
              bottom: 5,
            }}
          >
            <XAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
              )}
            />
            <Bar
              dataKey="sales"
              fill="currentColor"
              radius={[0, 4, 4, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ChartContainer>

        {loading && (
          <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>
        )}
      </CardContent>
    </Card>
  );
};

export default CashierPerformance;
