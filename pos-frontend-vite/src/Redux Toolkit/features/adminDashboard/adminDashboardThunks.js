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

// 📊 Get Dashboard Summary
export const getDashboardSummary = createAsyncThunk(
  'adminDashboard/getSummary',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching dashboard summary...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/summary', { headers });
      
      console.log('✅ Dashboard summary fetched successfully:', {
        totalStores: res.data.totalStores,
        activeStores: res.data.activeStores,
        pendingStores: res.data.pendingStores,
        blockedStores: res.data.blockedStores,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch dashboard summary:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch dashboard summary');
    }
  }
);

// 📈 Get Store Registration Stats (Last 7 Days)
export const getStoreRegistrationStats = createAsyncThunk(
  'adminDashboard/getRegistrationStats',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching store registration stats...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/store-registrations', { headers });
      
      console.log('✅ Store registration stats fetched successfully:', {
        dataPoints: res.data.length,
        stats: res.data.map(stat => ({
          date: stat.date,
          count: stat.count
        })),
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch store registration stats:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store registration stats');
    }
  }
);

// 🥧 Get Store Status Distribution
export const getStoreStatusDistribution = createAsyncThunk(
  'adminDashboard/getStatusDistribution',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching store status distribution...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/super-admin/dashboard/store-status-distribution', { headers });
      
      console.log('✅ Store status distribution fetched successfully:', {
        active: res.data.active,
        blocked: res.data.blocked,
        pending: res.data.pending,
        total: res.data.active + res.data.blocked + res.data.pending,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch store status distribution:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch store status distribution');
    }
  }
); 