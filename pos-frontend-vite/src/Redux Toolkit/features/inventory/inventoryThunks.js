import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// 🔹 Create inventory
export const createInventory = createAsyncThunk(
  'inventory/create',
  async (dto, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.post('/api/inventories', dto, config);
      console.log('createInventory fulfilled:', res.data);
      return res.data;
    } catch (err) {
      console.error('createInventory rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Failed to create inventory');
    }
  }
);

// 🔹 Update inventory
export const updateInventory = createAsyncThunk(
  'inventory/update',
  async ({ id, dto }, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.put(`/api/inventories/${id}`, dto, config);
      console.log('updateInventory fulfilled:', res.data);
      return res.data;
    } catch (err) {
      console.error('updateInventory rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Failed to update inventory');
    }
  }
);

// 🔹 Delete inventory
export const deleteInventory = createAsyncThunk(
  'inventory/delete',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };
    try {
      await api.delete(`/api/inventories/${id}`, config);
      console.log('deleteInventory fulfilled:', id);
      return id;
    } catch (err) {
      console.error('deleteInventory rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Failed to delete inventory');
    }
  }
);

// 🔹 Get inventory by ID
export const getInventoryById = createAsyncThunk(
  'inventory/getById',
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/${id}`, config);
      console.log('getInventoryById fulfilled:', res.data);
      return res.data;
    } catch (err) {
      console.error('getInventoryById rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Inventory not found');
    }
  }
);

// 🔹 Get inventory by branch ID
export const getInventoryByBranch = createAsyncThunk(
  'inventory/getByBranch',
  async (branchId, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/branch/${branchId}`, config);
      console.log('getInventoryByBranch fulfilled:', res.data);
      return res.data;
    } catch (err) {
      console.error('getInventoryByBranch rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch branch inventory');
    }
  }
);

// 🔹 Get inventory by product ID
export const getInventoryByProduct = createAsyncThunk(
  'inventory/getByProduct',
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await api.get(`/api/inventories/product/${productId}`, config);
      console.log('getInventoryByProduct fulfilled:', res.data);
      return res.data;
    } catch (err) {
      console.error('getInventoryByProduct rejected:', err.response?.data?.message || err);
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product inventory');
    }
  }
);
