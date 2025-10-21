import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { FileText, Download, Filter, Calendar, RefreshCw } from "lucide-react";
import { 
  getMonthlySales, 
  getSalesByCategory 
} from "@/Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks";
import { useToast } from "@/components/ui/use-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// Mock data for reports table
const reportData = [
  {
    id: 1,
    name: "Monthly Sales Report",
    type: "Sales",
    period: "July 2023",
    generatedOn: "2023-08-01",
    status: "Completed",
  },
  {
    id: 2,
    name: "Inventory Status Report",
    type: "Inventory",
    period: "Q2 2023",
    generatedOn: "2023-07-15",
    status: "Completed",
  },
  {
    id: 3,
    name: "Employee Performance",
    type: "HR",
    period: "June 2023",
    generatedOn: "2023-07-10",
    status: "Completed",
  },
  {
    id: 4,
    name: "Top Selling Products",
    type: "Products",
    period: "Q2 2023",
    generatedOn: "2023-07-05",
    status: "Completed",
  },
  {
    id: 5,
    name: "Customer Demographics",
    type: "Customers",
    period: "H1 2023",
    generatedOn: "2023-07-01",
    status: "Completed",
  },
];

export default function Reports() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { userProfile } = useSelector((state) => state.user);
  const { monthlySales, salesByCategory, loading } = useSelector((state) => state.storeAnalytics);
  
  const [reportType, setReportType] = useState("all");
  const [dateRange, setDateRange] = useState("last30");
  const hasFetchedData = useRef(false);
  
  const fetchReportsData = useCallback(async () => {
    if (!userProfile?.id || hasFetchedData.current) return;
    
    try {
      hasFetchedData.current = true;
      await Promise.all([
        dispatch(getMonthlySales(userProfile.id)).unwrap(),
        dispatch(getSalesByCategory(userProfile.id)).unwrap(),
      ]);
    } catch (err) {
      hasFetchedData.current = false; // Reset on error to allow retry
      toast({
        title: "Error",
        description: err || "Failed to fetch reports data",
        variant: "destructive",
      });
    }
  }, [dispatch, userProfile?.id, toast]);
  
  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Prepare chart data
  const salesData = monthlySales?.map(item => ({
    name: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
    sales: item.totalAmount
  })) || [];

  const categoryData = salesByCategory?.map(item => ({
    name: item.categoryName,
    value: item.totalSales
  })) || [];

  // Filter reports based on type
  const filteredReports = reportType === "all" 
    ? reportData 
    : reportData.filter(report => report.type.toLowerCase() === reportType.toLowerCase());

  const salesConfig = {
    sales: {
      label: "Sales",
      color: "#10b981",
    },
  };

  const categoryConfig = categoryData.reduce((config, item) => {
    config[item.name] = {
      label: item.name,
      color: COLORS[categoryData.indexOf(item) % COLORS.length],
    };
    return config;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading chart data...</p>
                </div>
              </div>
            ) : salesData.length > 0 ? (
              <ChartContainer config={salesConfig} className="h-80">
                <BarChart data={salesData}>
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
                  />
                  <ChartTooltip
                    content={({ active, payload }) => (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        formatter={(value) => [formatCurrency(value), "Sales"]}
                      />
                    )}
                  />
                  <Bar
                    dataKey="sales"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-emerald-500"
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">No sales data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading chart data...</p>
                </div>
              </div>
            ) : categoryData.length > 0 ? (
              <ChartContainer config={categoryConfig} className="h-80">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        formatter={(value) => [formatCurrency(value), "Sales"]}
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
            ) : (
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">No category data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

     
    </div>
  );
}