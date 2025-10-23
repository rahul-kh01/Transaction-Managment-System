import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiCalendar, FiDownload, FiFileText, FiBarChart2, FiTrendingUp, FiUsers } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, PieChart as RPieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
  getDailySalesChart,
  getPaymentBreakdown,
  getCategoryWiseSalesBreakdown,
  getTopCashiersByRevenue,
} from "@/Redux Toolkit/features/branchAnalytics/branchAnalyticsThunks";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  const dispatch = useDispatch();
  const branchId = useSelector((state) => state.branch.branch?.id);
  const {
    dailySales,
    paymentBreakdown,
    categorySales,
    topCashiers,
  } = useSelector((state) => state.branchAnalytics);

  useEffect(() => {
    if (branchId) {
      dispatch(getDailySalesChart({ branchId }));
      const today = new Date().toISOString().slice(0, 10);
      dispatch(getPaymentBreakdown({ branchId, date: today }));
      dispatch(getCategoryWiseSalesBreakdown({ branchId, date: today }));
      dispatch(getTopCashiersByRevenue(branchId));
    }
  }, [branchId, dispatch]);

  // Map API data to recharts format
  const salesData = dailySales?.map((item) => ({
    date: item.date,
    sales: item.totalSales,
  })) || [];

  const paymentData = paymentBreakdown?.map((item) => ({
    name: item.type,
    value: item.percentage,
  })) || [];

  const paymentConfig = paymentBreakdown?.reduce((acc, item, idx) => {
    acc[item.type] = {
      label: item.type,
      color: COLORS[idx % COLORS.length],
    };
    return acc;
  }, {}) || {};

  const categoryData = categorySales?.map((item) => ({
    name: item.categoryName,
    value: item.totalSales,
  })) || [];

  const categoryConfig = categorySales?.reduce((acc, item, idx) => {
    acc[item.categoryName] = {
      label: item.categoryName,
      color: COLORS[idx % COLORS.length],
    };
    return acc;
  }, {}) || {};

  const cashierData = topCashiers?.map((item) => ({
    name: item.cashierName,
    sales: item.totalRevenue,
  })) || [];

  const cashierConfig = {
    sales: {
      label: "Sales",
      color: "#4f46e5",
    },
  };

  const salesConfig = {
    sales: {
      label: "Sales",
      color: "#4f46e5",
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = (type, format) => {
    console.log(`Exporting ${type} report in ${format} format`);
    // Implement export functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FiCalendar className="h-4 w-4 mr-1" />
            {/* Date range selection can be added here */}
            {/* {dateRange.startDate} - {dateRange.endDate} */}
            Today
          </Button>
          <Button variant="outline" size="sm">
            <FiDownload className="h-4 w-4 mr-1" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FiBarChart2 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <FiTrendingUp className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <FiFileText className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="cashier" className="flex items-center gap-2">
            <FiUsers className="h-4 w-4" />
            Cashier Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Daily Sales Trend</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('sales', 'excel')}>
                    <FiDownload className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={salesConfig} className="h-96">
                  <BarChart data={salesData}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('payments', 'excel')}>
                    <FiDownload className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={paymentConfig} className="h-96">
                  <RPieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent
                          active={active}
                          payload={payload}
                          formatter={(value) => [`${value}%`, "Percentage"]}
                        />
                      )}
                    />
                    <ChartLegend
                      content={({ payload }) => (
                        <ChartLegendContent payload={payload} />
                      )}
                    />
                  </RPieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Sales Performance</CardTitle>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('sales', 'excel')}>
                  <FiDownload className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
              <CardContent>
                <ChartContainer config={salesConfig} className="h-[400px]">
                  <BarChart data={salesData}>
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
              </CardContent>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Product Category Performance</CardTitle>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('products', 'excel')}>
                  <FiDownload className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartContainer config={categoryConfig} className="h-80">
                  <RPieChart>
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
                          formatter={(value) => [`${value}%`, "Sales Percentage"]}
                        />
                      )}
                    />
                    <ChartLegend
                      content={({ payload }) => (
                        <ChartLegendContent payload={payload} />
                      )}
                    />
                  </RPieChart>
                </ChartContainer>

                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{category.name}</p>
                          <p className="text-2xl font-bold">{formatCurrency(category.value)}</p>
                        </div>
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Cashier Performance Tab */}
        <TabsContent value="cashier">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Cashier Performance</CardTitle>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => handleExport('cashier', 'excel')}>
                  <FiDownload className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={cashierConfig} className="h-96">
                <BarChart data={cashierData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                        formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;