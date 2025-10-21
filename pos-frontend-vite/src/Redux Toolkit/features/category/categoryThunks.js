import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/utils/api';

// 🔹 Create category
export const createCategory = createAsyncThunk('category/create', async ({ dto, token }, { rejectWithValue }) => {
  try {
    const res = await api.post('/api/categories', dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create category');
  }
});

// 🔹 Get categories by store ID
export const getCategoriesByStore = createAsyncThunk('category/getByStore', async ({ storeId, token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/api/categories/store/${storeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
  }
});

// 🔹 Update category
export const updateCategory = createAsyncThunk('category/update', async ({ id, dto, token }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/api/categories/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update category');
  }
});

// 🔹 Delete category
export const deleteCategory = createAsyncThunk('category/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    await api.delete(`/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete category');
  }
});
