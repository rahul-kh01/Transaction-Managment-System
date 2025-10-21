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

// 🔹 Create Customer
export const createCustomer = createAsyncThunk(
  'customer/create',
  async (customer, { rejectWithValue }) => {
    try {
      console.log('🔄 Creating customer...', { customer });
      
      const headers = getAuthHeaders();
      const res = await api.post('/api/customers', customer, { headers });
      
      console.log('✅ Customer created successfully:', {
        customerId: res.data.id,
        name: res.data.name,
        email: res.data.email,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to create customer:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: customer
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to create customer');
    }
  }
);

// 🔹 Update Customer
export const updateCustomer = createAsyncThunk(
  'customer/update',
  async ({ id, customer }, { rejectWithValue }) => {
    try {
      console.log('🔄 Updating customer...', { customerId: id, customer });
      
      const headers = getAuthHeaders();
      const res = await api.put(`/api/customers/${id}`, customer, { headers });
      
      console.log('✅ Customer updated successfully:', {
        customerId: res.data.id,
        name: res.data.name,
        email: res.data.email,
        response: res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to update customer:', {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        requestData: customer
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to update customer');
    }
  }
);

// 🔹 Delete Customer
export const deleteCustomer = createAsyncThunk(
  'customer/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Deleting customer...', { customerId: id });
      
      const headers = getAuthHeaders();
      await api.delete(`/api/customers/${id}`, { headers });
      
      console.log('✅ Customer deleted successfully:', { customerId: id });
      
      return id;
    } catch (err) {
      console.error('❌ Failed to delete customer:', {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to delete customer');
    }
  }
);

// 🔹 Get Customer by ID
export const getCustomerById = createAsyncThunk(
  'customer/getById',
  async (id, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching customer by ID...', { customerId: id });
      
      const headers = getAuthHeaders();
      const res = await api.get(`/api/customers/${id}`, { headers });
      
      console.log('✅ Customer fetched successfully:', res.data);
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch customer by ID:', {
        customerId: id,
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Customer not found');
    }
  }
);

// 🔹 Get All Customers
export const getAllCustomers = createAsyncThunk(
  'customer/getAll',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching all customers...');
      
      const headers = getAuthHeaders();
      const res = await api.get('/api/customers', { headers });
      
      console.log('✅ All customers fetched successfully:', {
        customerCount: res.data.length,
        customers:res.data
      });
      
      return res.data;
    } catch (err) {
      console.error('❌ Failed to fetch all customers:', {
        error: err.response?.data || err.message,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch customers');
    }
  }
); 