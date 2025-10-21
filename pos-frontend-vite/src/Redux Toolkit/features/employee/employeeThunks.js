import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api";


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

// 🔹 Create Store Employee
export const createStoreEmployee = createAsyncThunk(
  "employee/createStoreEmployee",
  async ({ employee, storeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/store/${storeId}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create store employee"
      );
    }
  }
);

// 🔹 Create Branch Employee
export const createBranchEmployee = createAsyncThunk(
  "employee/createBranchEmployee",
  async ({ employee, branchId, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/api/employees/branch/${branchId}`, employee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create branch employee"
      );
    }
  }
);

// 🔹 Update Employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ employeeId, employeeDetails, token }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/employees/${employeeId}`, employeeDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update employee"
      );
    }
  }
);

// 🔹 Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async ({ employeeId, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return employeeId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);

// 🔹 Find Employee by ID
export const findEmployeeById = createAsyncThunk(
  "employee/findEmployeeById",
  async ({ employeeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Employee not found"
      );
    }
  }
);

// 🔹 Find Store Employees
export const findStoreEmployees = createAsyncThunk(
  "employee/findStoreEmployees",
  async ({ storeId, token }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/employees/store/${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch store employees"
      );
    }
  }
);

// 🔹 Find Branch Employees
export const findBranchEmployees = createAsyncThunk(
  "employee/findBranchEmployees",
  async ({ branchId, role }, { rejectWithValue }) => {
    const params = [];
    if(role) params.push(`role=${role}`);
    const query = params.length ? `?${params.join('&')}` : '';

    try {
      const headers=getAuthHeaders();
      const res = await api.get(`/api/employees/branch/${branchId}${query}`, {headers},
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch branch employees"
      );
    }
  }
);
