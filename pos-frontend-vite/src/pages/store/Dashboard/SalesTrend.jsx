import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";
import {
  getSalesTrends,
  getDailySales,
} from "@/Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SalesTrend = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { salesTrends, dailySales, loading } = useSelector(
    (state) => state.storeAnalytics
  );
  const { userProfile } = useSelector((state) => state.user);
  const [period, setPeriod] = useState("daily");

  useEffect(() => {
    if (userProfile?.id) {
      fetchSalesData();
    }
  }, [userProfile, period]);

  const fetchSalesData = async () => {
    try {
      if (period === "daily") {
        await dispatch(getDailySales(userProfile.id)).unwrap();
      } else {
        await dispatch(
          getSalesTrends({ storeAdminId: userProfile.id, period })
        ).unwrap();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch sales data",
        variant: "destructive",
      });
    }
  };

  // Format currency for tooltip
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get chart data based on period
  const getChartData = () => {
    if (period === "daily" && dailySales) {
      return dailySales.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        sales: item.totalAmount,
      }));
    } else if (salesTrends) {
      return salesTrends.map((item) => ({
        date: item.period,
        sales: item.totalSales,
      }));
    }
    return [];
  };

  const chartData = getChartData();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Sales Trend</CardTitle>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading sales data...</p>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
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
              <Tooltip
                formatter={(value) => [formatCurrency(value), "Sales"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#10b981" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-emerald-500 mx-auto" />
              <p className="mt-2 text-gray-500">No sales data available</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesTrend;
