import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { FiDollarSign, FiHome, FiShoppingCart, FiUsers } from "react-icons/fi";
import { getStoreOverview } from "@/Redux Toolkit/features/storeAnalytics/storeAnalyticsThunks";
import { useToast } from "@/components/ui/use-toast";

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { storeOverview, loading } = useSelector((state) => state.storeAnalytics);
  const { userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    if (userProfile?.id) {
      fetchStoreOverview();
    }
  }, [userProfile, fetchStoreOverview]);

  const fetchStoreOverview = React.useCallback(async () => {
    try {
      await dispatch(getStoreOverview(userProfile.id)).unwrap();
    } catch (err) {
      toast({
        title: "Error",
        description: err || "Failed to fetch store overview",
        variant: "destructive",
      });
    }
  }, [dispatch, userProfile.id, toast]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // Format percentage change
  const formatChange = (current, previous) => {
    if (!previous || previous === 0) return "+0%";
    const change = ((current - previous) / previous) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

  const stats = [
    { 
      title: "Total Sales", 
      value: formatCurrency(storeOverview?.totalSales || 0), 
      icon: <FiDollarSign className="w-8 h-8 text-emerald-500" />, 
      change: formatChange(storeOverview?.totalSales, storeOverview?.previousPeriodSales),
      loading: loading
    },
    { 
      title: "Total Branches", 
      value: storeOverview?.totalBranches || 0, 
      icon: <FiHome className="w-8 h-8 text-emerald-500" />, 
      change: formatChange(storeOverview?.totalBranches, storeOverview?.previousPeriodBranches),
      loading: loading
    },
    { 
      title: "Total Products", 
      value: storeOverview?.totalProducts || 0, 
      icon: <FiShoppingCart className="w-8 h-8 text-emerald-500" />, 
      change: formatChange(storeOverview?.totalProducts, storeOverview?.previousPeriodProducts),
      loading: loading
    },
    { 
      title: "Total Employees", 
      value: storeOverview?.totalEmployees || 0, 
      icon: <FiUsers className="w-8 h-8 text-emerald-500" />, 
      change: formatChange(storeOverview?.totalEmployees, storeOverview?.previousPeriodEmployees),
      loading: loading
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">
                  {stat.loading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    stat.value
                  )}
                </h3>
                <p className={`text-xs font-medium mt-1 ${
                  stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stat.loading ? (
                    <span className="inline-block h-4 w-16 bg-gray-200 rounded animate-pulse"></span>
                  ) : (
                    `${stat.change} from last month`
                  )}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-full">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;