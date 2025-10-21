import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { getTopProductsByQuantity } from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const COLORS = ["#6D214F", "#B33771", "#D980FA", "#833471", "#84817a"];

const TopProducts = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const { topProducts, loading } = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getTopProductsByQuantity(branchId));
    }
  }, [branchId, dispatch]);

  // Map API data to recharts format
  const data = topProducts?.map((item) => ({
    name: item.productName,
    value: item.quantitySold,
    percentage: item.percentage,
  })) || [];

  const config = data.reduce((acc, item, idx) => {
    acc[item.name] = {
      label: item.name,
      color: COLORS[idx % COLORS.length],
    };
    return acc;
  }, {});

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    // Use percentage from data if available
    const percentValue = data[index]?.percentage ?? percent * 100;
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${percentValue.toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Product Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-64">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => [
                    `${value}%`,
                    "Sales Percentage"
                  ]}
                />
              )}
            />
            <ChartLegend
              content={({ payload }) => (
                <ChartLegendContent payload={payload} />
              )}
            />
          </PieChart>
        </ChartContainer>
        {loading && <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>}
      </CardContent>
    </Card>
  );
};

export default TopProducts;
