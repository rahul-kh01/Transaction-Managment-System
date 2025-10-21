import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";

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

// 🔹 Create store
export const createStore = createAsyncThunk(
  "store/create",
  async (storeData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.post("/api/stores", storeData, { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create store"
      );
    }
  }
);

// 🔹 Get store by ID
export const getStoreById = createAsyncThunk(
  "store/getById",
  async (id, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/stores/${id}`, { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Store not found"
      );
    }
  }
);

// 🔹 Get all stores
export const getAllStores = createAsyncThunk(
  "store/getAll",
  async (status, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores", { headers,
        params: status ? { status } : undefined,
       });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stores"
      );
    }
  }
);

// 🔹 Update store
export const updateStore = createAsyncThunk(
  "store/update",
  async ({ id, storeData }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/stores/${id}`, storeData, { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update store"
      );
    }
  }
);

// 🔹 Delete store
export const deleteStore = createAsyncThunk(
  "store/delete",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.delete("/api/stores", { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete store"
      );
    }
  }
);

// 🔹 Get store by admin
export const getStoreByAdmin = createAsyncThunk(
  "store/getByAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores/admin", { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Not authorized"
      );
    }
  }
);

// 🔹 Get store by employee
export const getStoreByEmployee = createAsyncThunk(
  "store/getByEmployee",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get("/api/stores/employee", { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Not authorized"
      );
    }
  }
);

// 🔹 Get employee list by store
export const getStoreEmployees = createAsyncThunk(
  "store/getEmployees",
  async (storeId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.get(`/api/stores/${storeId}/employee/list`, { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get employees"
      );
    }
  }
);

// 🔹 Add employee
export const addEmployee = createAsyncThunk(
  "store/addEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.post("/api/stores/add/employee", employeeData, { headers });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add employee"
      );
    }
  }
);

// 🔹 Moderate store (approve/block/reject)
export const moderateStore = createAsyncThunk(
  "store/moderateStore",
  async ({ storeId, action }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const res = await api.put(`/api/stores/${storeId}/moderate`, null, {
        headers,
        params: { action },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to moderate store'
      );
    }
  }
);
