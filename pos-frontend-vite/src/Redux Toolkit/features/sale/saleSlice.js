import { createSlice } from '@reduxjs/toolkit';
import {
  createSale,
  getSaleById,
  getAllSales,
  getSalesByDateRange,
  getSalesByBranch,
  getSalesByEmployee,
  getSalesByPaymentMethod
} from './saleThunks';

const initialState = {
  sale: null,
  sales: [],
  loading: false,
  error: null,
};

const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    resetSaleState: (state) => {
      state.sale = null;
      state.sales = [];
      state.loading = false;
      state.error = null;
    },
    setSales: (state, action) => {
      state.sales = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create sale
      .addCase(createSale.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSale.fulfilled, (state, action) => {
        state.loading = false;
        state.sale = action.payload;
        state.sales.unshift(action.payload); // Add to beginning of array
      })
      .addCase(createSale.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get sale by ID
      .addCase(getSaleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSaleById.fulfilled, (state, action) => {
        state.loading = false;
        state.sale = action.payload;
      })
      .addCase(getSaleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get all sales
      .addCase(getAllSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getAllSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get sales by date range
      .addCase(getSalesByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getSalesByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get sales by branch
      .addCase(getSalesByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getSalesByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get sales by employee
      .addCase(getSalesByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getSalesByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get sales by payment method
      .addCase(getSalesByPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSalesByPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getSalesByPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSaleState, setSales } = saleSlice.actions;
export default saleSlice.reducer;