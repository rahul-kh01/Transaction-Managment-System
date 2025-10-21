import { createSlice } from '@reduxjs/toolkit';
import {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  getTransactionsByDateRange,
  getTransactionsByType,
  getTransactionsByPaymentMethod
} from './transactionThunks';

const initialState = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetTransactionState: (state) => {
      state.transaction = null;
      state.transactions = [];
      state.loading = false;
      state.error = null;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.transactions.unshift(action.payload); // Add to beginning of array
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get transaction by ID
      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get all transactions
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get transactions by date range
      .addCase(getTransactionsByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get transactions by type
      .addCase(getTransactionsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get transactions by payment method
      .addCase(getTransactionsByPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsByPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTransactionState, setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;