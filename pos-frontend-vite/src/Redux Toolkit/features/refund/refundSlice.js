import { createSlice } from '@reduxjs/toolkit';
import {
  createRefund,
  getAllRefunds,
  getRefundsByCashier,
  getRefundsByBranch,
  getRefundsByShift,
  getRefundsByCashierAndDateRange,
  getRefundById,
  deleteRefund
} from './refundThunks';

const initialState = {
  refunds: [],
  refundsByCashier: [],
  refundsByBranch: [],
  refundsByShift: [],
  refundsByDateRange: [],
  selectedRefund: null,
  loading: false,
  error: null,
};

const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    clearRefundState: (state) => {
      state.refunds = [];
      state.refundsByCashier = [];
      state.refundsByBranch = [];
      state.refundsByShift = [];
      state.refundsByDateRange = [];
      state.selectedRefund = null;
      state.error = null;
    },
    clearSelectedRefund: (state) => {
      state.selectedRefund = null;
    },
    clearRefundsByCashier: (state) => {
      state.refundsByCashier = [];
    },
    clearRefundsByBranch: (state) => {
      state.refundsByBranch = [];
    },
    clearRefundsByShift: (state) => {
      state.refundsByShift = [];
    },
    clearRefundsByDateRange: (state) => {
      state.refundsByDateRange = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Refund
      .addCase(createRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds.push(action.payload);
        // Also add to other relevant arrays
        state.refundsByCashier.push(action.payload);
        state.refundsByBranch.push(action.payload);
        if (action.payload.shiftReportId) {
          state.refundsByShift.push(action.payload);
        }
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Refunds
      .addCase(getAllRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload;
      })
      .addCase(getAllRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Refunds by Cashier
      .addCase(getRefundsByCashier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundsByCashier.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByCashier = action.payload;
      })
      .addCase(getRefundsByCashier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Refunds by Branch
      .addCase(getRefundsByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundsByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByBranch = action.payload;
      })
      .addCase(getRefundsByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Refunds by Shift
      .addCase(getRefundsByShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundsByShift.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByShift = action.payload;
      })
      .addCase(getRefundsByShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Refunds by Cashier and Date Range
      .addCase(getRefundsByCashierAndDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundsByCashierAndDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.refundsByDateRange = action.payload;
      })
      .addCase(getRefundsByCashierAndDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Refund by ID
      .addCase(getRefundById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRefund = action.payload;
      })
      .addCase(getRefundById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Refund
      .addCase(deleteRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRefund.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted refund from all arrays
        state.refunds = state.refunds.filter(refund => refund.id !== action.payload);
        state.refundsByCashier = state.refundsByCashier.filter(refund => refund.id !== action.payload);
        state.refundsByBranch = state.refundsByBranch.filter(refund => refund.id !== action.payload);
        state.refundsByShift = state.refundsByShift.filter(refund => refund.id !== action.payload);
        state.refundsByDateRange = state.refundsByDateRange.filter(refund => refund.id !== action.payload);
        
        // Clear selected refund if it was the deleted one
        if (state.selectedRefund && state.selectedRefund.id === action.payload) {
          state.selectedRefund = null;
        }
      })
      .addCase(deleteRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generic error handling for all refund actions
      .addMatcher(
        (action) => action.type.startsWith('refund/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { 
  clearRefundState, 
  clearSelectedRefund, 
  clearRefundsByCashier, 
  clearRefundsByBranch, 
  clearRefundsByShift, 
  clearRefundsByDateRange 
} = refundSlice.actions;

export default refundSlice.reducer; 