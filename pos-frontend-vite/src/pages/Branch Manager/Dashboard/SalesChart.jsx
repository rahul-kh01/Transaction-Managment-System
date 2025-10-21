import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { getDailySalesChart } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const SalesChart = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const analytics = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getDailySalesChart({ branchId }));
    }
  }, [branchId, dispatch]);



  // Map API data to recharts format
  const data = analytics?.dailySales?.map((item) => ({
    name: item.date,
    sales: item.totalSales,
  })) || [];

  const config = {
    sales: {
      label: "Sales",
      color: "#6D214F",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Daily Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-80">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => [`₹${value}`, "Sales"]}
                />
              )}
            />
            <Bar
              dataKey="sales"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ChartContainer>
        {analytics?.loading && <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>}
      </CardContent>
    </Card>
  );
};

export default SalesChart;