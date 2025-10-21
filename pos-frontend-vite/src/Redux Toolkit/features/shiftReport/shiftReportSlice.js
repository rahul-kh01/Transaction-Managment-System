import { createSlice } from '@reduxjs/toolkit';
import {
  startShift,
  endShift,
  getCurrentShiftProgress,
  getShiftReportByDate,
  getShiftsByCashier,
  getShiftsByBranch,
  getAllShifts,
  getShiftById,
  deleteShift
} from './shiftReportThunks';

const initialState = {
  shifts: [],
  currentShift: null,
  selectedShift: null,
  shiftsByCashier: [],
  shiftsByBranch: [],
  loading: false,
  error: null,
};

const shiftReportSlice = createSlice({
  name: 'shiftReport',
  initialState,
  reducers: {
    clearShiftReportState: (state) => {
      state.shifts = [];
      state.currentShift = null;
      state.selectedShift = null;
      state.shiftsByCashier = [];
      state.shiftsByBranch = [];
      state.error = null;
    },
    clearCurrentShift: (state) => {
      state.currentShift = null;
    },
    clearSelectedShift: (state) => {
      state.selectedShift = null;
    },
    clearShiftsByCashier: (state) => {
      state.shiftsByCashier = [];
    },
    clearShiftsByBranch: (state) => {
      state.shiftsByBranch = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Start Shift
      .addCase(startShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startShift.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShift = action.payload;
        state.shifts.push(action.payload);
      })
      .addCase(startShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // End Shift
      .addCase(endShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(endShift.fulfilled, (state, action) => {
        state.loading = false;
        // Update the current shift with end time and final stats
        if (state.currentShift && state.currentShift.id === action.payload.id) {
          state.currentShift = action.payload;
        }
        // Update the shift in the shifts array
        const index = state.shifts.findIndex(shift => shift.id === action.payload.id);
        if (index !== -1) {
          state.shifts[index] = action.payload;
        }
      })
      .addCase(endShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Current Shift Progress
      .addCase(getCurrentShiftProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentShiftProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShift = action.payload;
      })
      .addCase(getCurrentShiftProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Shift Report by Date
      .addCase(getShiftReportByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShiftReportByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShift = action.payload;
      })
      .addCase(getShiftReportByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Shifts by Cashier
      .addCase(getShiftsByCashier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShiftsByCashier.fulfilled, (state, action) => {
        state.loading = false;
        state.shiftsByCashier = action.payload;
      })
      .addCase(getShiftsByCashier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Shifts by Branch
      .addCase(getShiftsByBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShiftsByBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.shiftsByBranch = action.payload;
      })
      .addCase(getShiftsByBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Shifts
      .addCase(getAllShifts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
      })
      .addCase(getAllShifts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Shift by ID
      .addCase(getShiftById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShiftById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShift = action.payload;
      })
      .addCase(getShiftById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Shift
      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted shift from all arrays
        state.shifts = state.shifts.filter(shift => shift.id !== action.payload);
        state.shiftsByCashier = state.shiftsByCashier.filter(shift => shift.id !== action.payload);
        state.shiftsByBranch = state.shiftsByBranch.filter(shift => shift.id !== action.payload);
        
        // Clear selected shift if it was the deleted one
        if (state.selectedShift && state.selectedShift.id === action.payload) {
          state.selectedShift = null;
        }
        
        // Clear current shift if it was the deleted one
        if (state.currentShift && state.currentShift.id === action.payload) {
          state.currentShift = null;
        }
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generic error handling for all shift report actions
      .addMatcher(
        (action) => action.type.startsWith('shiftReport/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { 
  clearShiftReportState, 
  clearCurrentShift, 
  clearSelectedShift, 
  clearShiftsByCashier, 
  clearShiftsByBranch 
} = shiftReportSlice.actions;

export default shiftReportSlice.reducer; 