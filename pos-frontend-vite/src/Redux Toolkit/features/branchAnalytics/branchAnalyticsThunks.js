import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// Helper function to get JWT token
const getAuthToken = () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    throw new Error('No JWT token found');
  }
  return token;
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Get daily sales chart data (last n days)
export const getDailySalesChart = createAsyncThunk(
  'branchAnalytics/getDailySalesChart',
  async ({ branchId, days = 7 }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/daily-sales?branchId=${branchId}&days=${days}`, { headers });
      console.log('✅ Daily sales chart response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch daily sales chart:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch daily sales chart');
    }
  }
);

// Get top 5 products by quantity (with % contribution)
export const getTopProductsByQuantity = createAsyncThunk(
  'branchAnalytics/getTopProductsByQuantity',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/top-products?branchId=${branchId}`, { headers });
      console.log('✅ Top products by quantity response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch top products:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top products');
    }
  }
);

// Get top 5 cashiers by revenue
export const getTopCashiersByRevenue = createAsyncThunk(
  'branchAnalytics/getTopCashiersByRevenue',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/top-cashiers?branchId=${branchId}`, { headers });
      console.log('✅ Top cashiers by revenue response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch top cashiers:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch top cashiers');
    }
  }
);

// Get category-wise sales breakdown
export const getCategoryWiseSalesBreakdown = createAsyncThunk(
  'branchAnalytics/getCategoryWiseSalesBreakdown',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/category-sales?branchId=${branchId}&date=${date}`, { headers });
      console.log('✅ Category-wise sales breakdown response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch category-wise sales breakdown:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch category-wise sales breakdown');
    }
  }
);

// Get today's branch overview
export const getTodayOverview = createAsyncThunk(
  'branchAnalytics/getTodayOverview',
  async (branchId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/today-overview?branchId=${branchId}`, { headers });
      console.log('✅ Today overview response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch today overview:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch today overview');
    }
  }
);

// Get payment breakdown for a date
export const getPaymentBreakdown = createAsyncThunk(
  'branchAnalytics/getPaymentBreakdown',
  async ({ branchId, date }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/branch-analytics/payment-breakdown?branchId=${branchId}&date=${date}`, { headers });
      console.log('✅ Payment breakdown response:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch payment breakdown:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch payment breakdown');
    }
  }
); 