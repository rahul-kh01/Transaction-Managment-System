import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// 🔹 Get user profile from JWT
export const getUserProfile = createAsyncThunk('user/getProfile', async (token, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
  }
});

// 🔹 Get all customers
export const getCustomers = createAsyncThunk('user/getCustomers', async (token, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/customer', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Get customers success:', res.data);
    return res.data;
  } catch (err) {
    console.error('Get customers error:', err);
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
  }
});

// 🔹 Get all cashiers
export const getCashiers = createAsyncThunk('user/getCashiers', async (token, { rejectWithValue }) => {
  try {
    const res = await api.get('/api/users/cashier', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Get cashiers success:', res.data);
    return res.data;
  } catch (err) {
    console.error('Get cashiers error:', err);
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch cashiers');
  }
});

// 🔹 Get all users
export const getAllUsers = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/users/list');
    console.log('Get all users success:', res.data);
    return res.data;
  } catch (err) {
    console.error('Get all users error:', err);
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

// 🔹 Get user by ID
export const getUserById = createAsyncThunk('user/getById', async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`/users/${userId}`);
    console.log('Get user by ID success:', res.data);
    return res.data;
  } catch (err) {
    console.error('Get user by ID error:', err);
    return rejectWithValue(err.response?.data?.message || 'User not found');
  }
});

// 🔹 Logout user
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    localStorage.removeItem('jwt');
    // Optionally, clear other relevant local storage items or session data
    console.log('User logged out successfully');
    return 'Logged out successfully';
  } catch (err) {
    console.error('Logout error:', err);
    return rejectWithValue(err.message || 'Failed to logout');
  }
});
