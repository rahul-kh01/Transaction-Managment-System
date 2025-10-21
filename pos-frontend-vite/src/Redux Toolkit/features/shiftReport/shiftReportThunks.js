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

// 🔹 Start Shift
export const startShift = createAsyncThunk(
  'shiftReport/start',
  async (branchId, { rejectWithValue }) => {
    try {
      console.log('🔄 Starting shift...', { branchId });
      
      const headers = getAuthHeaders();
      const res = await api.post(`/api/shift-reports/start?branchId=${branchId}`, {}, { headers });
      
      console.log('✅ Shift started successfully:', {
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        branchId: res.data.branchId,
        startTime: res.data.startTime,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to start shift:', {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to start shift');
    }
  }
);

// 🔹 End Shift
export const endShift = createAsyncThunk(
  'shiftReport/end',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Ending shift...');
      
      const headers = getAuthHeaders();
      const res = await api.patch('/api/shift-reports/end', {}, { headers });
      
      console.log('✅ Shift ended successfully:', {
        shiftId: res.data.id,
        endTime: res.data.endTime,
        totalSales: res.data.totalSales,
        totalOrders: res.data.totalOrders,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to end shift:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to end shift');
    }
  }
);

// 🔹 Get Current Shift Progress
export const getCurrentShiftProgress = createAsyncThunk(
  'shiftReport/getCurrent',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching current shift progress...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/shift-reports/current', { headers });
      
      console.log('✅ Current shift progress fetched successfully:', {
        shiftId: res.data.id,
        startTime: res.data.startTime,
        totalSales: res.data.totalSales,
        totalOrders: res.data.totalOrders,
        response: res.data
      });

      // console.log('✅ Current shift progress fetched successfully:', res);
      
      return res.data;

    } catch (err) {
      console.error('❌ Failed to fetch current shift progress:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data:err
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch current shift progress');
    }
  }
);

// 🔹 Get Shift Report by Date
export const getShiftReportByDate = createAsyncThunk(
  'shiftReport/getByDate',
  async ({ cashierId, date }, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shift report by date...', { cashierId, date });
      
      const headers = getAuthHeaders();
      const formattedDate = encodeURIComponent(date);
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}/by-date?date=${formattedDate}`, { headers });
      
      console.log('✅ Shift report by date fetched successfully:', {
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        date: res.data.startTime,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch shift report by date:', {
        cashierId,
        date,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shift report by date');
    }
  }
);

// 🔹 Get Shifts by Cashier
export const getShiftsByCashier = createAsyncThunk(
  'shiftReport/getByCashier',
  async (cashierId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shifts by cashier...', { cashierId });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/cashier/${cashierId}`, { headers });
      
      console.log('✅ Shifts by cashier fetched successfully:', {
        cashierId,
        shiftCount: res.data.length,
        shifts: res.data.map(shift => ({
          id: shift.id,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch shifts by cashier:', {
        cashierId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by cashier');
    }
  }
);

// 🔹 Get Shifts by Branch
export const getShiftsByBranch = createAsyncThunk(
  'shiftReport/getByBranch',
  async (branchId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shifts by branch...', { branchId });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/branch/${branchId}`, { headers });
      
      console.log('✅ Shifts by branch fetched successfully:', {
        branchId,
        shiftCount: res.data.length,
        totalSales: res.data.reduce((sum, shift) => sum + (shift.totalSales || 0), 0),
        shifts: res.data.map(shift => ({
          id: shift.id,
          cashierId: shift.cashierId,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch shifts by branch:', {
        branchId,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch shifts by branch');
    }
  }
);

// 🔹 Get All Shifts
export const getAllShifts = createAsyncThunk(
  'shiftReport/getAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching all shifts...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/shift-reports', { headers });
      
      console.log('✅ All shifts fetched successfully:', {
        shiftCount: res.data.length,
        totalSales: res.data.reduce((sum, shift) => sum + (shift.totalSales || 0), 0),
        shifts: res.data.map(shift => ({
          id: shift.id,
          cashierId: shift.cashierId,
          branchId: shift.branchId,
          startTime: shift.startTime,
          endTime: shift.endTime,
          totalSales: shift.totalSales
        }))
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch all shifts:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch all shifts');
    }
  }
);

// 🔹 Get Shift by ID
export const getShiftById = createAsyncThunk(
  'shiftReport/getById',
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching shift by ID...', { shiftId: id });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/shift-reports/${id}`, { headers });
      
      console.log('✅ Shift by ID fetched successfully:', {
        shiftId: res.data.id,
        cashierId: res.data.cashierId,
        branchId: res.data.branchId,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        totalSales: res.data.totalSales,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch shift by ID:', {
        shiftId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Shift not found');
    }
  }
);

// 🔹 Delete Shift
export const deleteShift = createAsyncThunk(
  'shiftReport/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Deleting shift...', { shiftId: id });
      
      const headers = getAuthHeaders();
      await api.delete(`/api/shift-reports/${id}`, { headers });
      
      console.log('✅ Shift deleted successfully:', { shiftId: id });
      
      return id;
    } catch (err) {
      console.error('❌ Failed to delete shift:', {
        shiftId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete shift');
    }
  }
); 